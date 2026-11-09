(() => {
  const SUPABASE_URL = "https://elehwtzcvdxsxyjjfvyw.supabase.co";
  const SUPABASE_KEY = "sb_publishable_4A2GbN3nbIGQrOyCZNhB1Q__FzN_W2I";
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
  window.EFIEEJA_SUPABASE = client;
  let resolveReady;
  window.EFIEEJA_AUTH_READY = new Promise(resolve => { resolveReady = resolve; });
  let resolved = false;
  let currentUser = null;
  let currentRole = null;
  const $ = id => document.getElementById(id);
  const PENDING_KEY = "efieeja_pending_access_v2";
  const params = new URLSearchParams(window.location.search);
  const inviteFromUrl = (params.get("join") || "").trim().toUpperCase();

  function message(text, error = false) {
    const el = $("authMessage");
    if (!el) return;
    el.textContent = text;
    el.style.color = error ? "#9a3333" : "#315e4d";
  }
  function portalMessage(text, error = false) {
    const el = $("studentPortalMessage");
    if (!el) return;
    el.textContent = text;
    el.style.color = error ? "#9a3333" : "#315e4d";
  }
  function finish(role, user) {
    currentRole = role;
    currentUser = user;
    window.EFIEEJA_ROLE = role;
    window.EFIEEJA_USER_ID = user?.id || null;
    $("authGate").hidden = !!user;
    $("appRoot").hidden = !(user && role === "teacher");
    $("studentPortal").hidden = !(user && role === "student");
    $("sessionBar").hidden = !(user && role === "teacher");
    if (user && role === "teacher") $("sessionEmail").textContent = user.email || "Professor(a)";
    if (!resolved) {
      resolved = true;
      resolveReady({ user, role });
    }
  }
  async function loadTeacherClasses() {
    const { data, error } = await client.from("classes")
      .select("id,name,school_year,shift,join_code,created_at")
      .eq("teacher_id", currentUser.id).order("created_at", { ascending: true });
    if (error) throw error;
    const list = $("teacherClassesList");
    list.replaceChildren();
    if (!data?.length) {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = "Nenhuma turma criada ainda. Use o cadastro de turma abaixo.";
      list.appendChild(empty);
    }
    for (const c of (data || [])) {
      const item = document.createElement("div");
      item.className = "item";
      const info = document.createElement("span");
      const strong = document.createElement("b");
      strong.textContent = c.name;
      const small = document.createElement("small");
      small.textContent = [c.school_year || "", c.shift || "", "Código: " + c.join_code].filter(Boolean).join(" · ");
      info.append(strong, small);
      const actions = document.createElement("div");
      actions.className = "actions";
      const link = window.location.origin + window.location.pathname + "?join=" + encodeURIComponent(c.join_code);
      const copy = document.createElement("button");
      copy.type = "button";
      copy.textContent = "Copiar link do estudante";
      copy.addEventListener("click", async () => {
        try { await navigator.clipboard.writeText(link); copy.textContent = "Link copiado"; }
        catch { window.prompt("Copie o link da turma:", link); }
      });
      const code = document.createElement("button");
      code.type = "button";
      code.textContent = "Copiar código";
      code.addEventListener("click", async () => {
        try { await navigator.clipboard.writeText(c.join_code); code.textContent = "Código copiado"; }
        catch { window.prompt("Código da turma:", c.join_code); }
      });
      actions.append(copy, code);
      item.append(info, actions);
      list.appendChild(item);
    }
  }
  async function joinClass(code, details) {
    const { data, error } = await client.rpc("join_class", {
      p_join_code: code,
      p_display_name: details.name,
      p_birth_date: details.birth || null,
      p_sex_reference: details.sex || null
    });
    if (error) throw error;
    const row = Array.isArray(data) ? data[0] : data;
    if (!row?.student_id) throw new Error("A turma foi localizada, mas o cadastro não retornou um identificador.");
    return row;
  }
  async function activateSession(session) {
    if (!session?.user) {
      $("authGate").hidden = false;
      $("appRoot").hidden = true;
      $("studentPortal").hidden = true;
      $("sessionBar").hidden = true;
      return;
    }
    const pending = (() => { try { return JSON.parse(localStorage.getItem(PENDING_KEY) || "null"); } catch { return null; } })();
    const mode = pending?.mode || params.get("mode") || (inviteFromUrl ? "student" : null);
    if (mode === "teacher") {
      // Never promote an already-registered student merely because they reopened the app.
      const { data: alreadyStudent, error: studentCheckError } = await client.from("students")
        .select("id").eq("auth_user_id", session.user.id).maybeSingle();
      if (studentCheckError) throw studentCheckError;
      if (!alreadyStudent) {
        const { error } = await client.rpc("register_as_teacher");
        if (error) throw error;
      }
    }
    if (mode === "student" && (pending?.joinCode || inviteFromUrl)) {
      const code = (pending?.joinCode || inviteFromUrl).toUpperCase();
      const { data: existingStudent, error: existingError } = await client.from("students")
        .select("id,display_name,birth_date,sex_reference").eq("auth_user_id", session.user.id).maybeSingle();
      if (existingError) throw existingError;
      const details = pending?.details?.name ? pending.details : (existingStudent ? {
        name: existingStudent.display_name, birth: existingStudent.birth_date, sex: existingStudent.sex_reference
      } : null);
      finish("student", session.user);
      if (!details) {
        $("studentWelcome").textContent = "Seu e-mail foi confirmado. Complete seus dados para criar seu identificador permanente e entrar na turma.";
        $("studentPermanentId").textContent = "Será criado ao concluir o cadastro.";
        $("studentFirstJoin").hidden = false;
        $("studentFirstCode").value = code;
        $("studentFirstName").value = "";
        $("studentFirstBirth").value = "";
        $("studentFirstSex").value = "";
        return;
      }
      const joined = await joinClass(code, details);
      localStorage.removeItem(PENDING_KEY);
      $("studentWelcome").textContent = "Cadastro vinculado à turma: " + joined.class_name;
      $("studentPermanentId").textContent = joined.student_code;
      $("studentFirstJoin").hidden = true;
      $("studentNewJoinCode").value = "";
      return;
    }
    const { data: profile, error: profileError } = await client.from("profiles").select("role,display_name").eq("id", session.user.id).maybeSingle();
    if (profileError) throw profileError;
    const role = profile?.role || "student";
    finish(role, session.user);
    if (role === "teacher") {
      await loadTeacherClasses();
    } else {
      const { data: student, error } = await client.from("students")
        .select("id,display_name").eq("auth_user_id", session.user.id).maybeSingle();
      if (error) throw error;
      if (student) {
        $("studentWelcome").textContent = "Olá, " + student.display_name + ". Sua conta está ativa.";
        $("studentPermanentId").textContent = student.id;
        $("studentFirstJoin").hidden = true;
      } else {
        $("studentWelcome").textContent = "Sua conta está autenticada. Informe o código da turma e seus dados para concluir o cadastro.";
        $("studentPermanentId").textContent = "Será criado ao vincular a primeira turma.";
        $("studentFirstJoin").hidden = false;
        if (inviteFromUrl) $("studentFirstCode").value = inviteFromUrl;
      }
    }
  }

  $("accountRole").addEventListener("change", () => {
    const student = $("accountRole").value === "student";
    $("studentJoinFields").classList.toggle("hide", !student);
    if (student && inviteFromUrl) $("joinCode").value = inviteFromUrl;
    $("authSubmit").textContent = student ? "Receber link para entrar na turma" : "Receber link de acesso do professor";
  });
  if (inviteFromUrl) {
    $("accountRole").value = "student";
    $("studentJoinFields").classList.remove("hide");
    $("joinCode").value = inviteFromUrl;
    $("studentName").required = true;
  }
  $("authForm").addEventListener("submit", async event => {
    event.preventDefault();
    const mode = $("accountRole").value;
    const email = $("authEmail").value.trim().toLowerCase();
    const code = mode === "student" ? $("joinCode").value.trim().toUpperCase() : "";
    const details = mode === "student" ? {
      name: $("studentName").value.trim(),
      birth: $("studentBirth").value || null,
      sex: $("studentSex").value || null
    } : null;
    if (mode === "student" && (!code || !details.name)) return message("Informe o código da turma e seu nome.", true);
    localStorage.setItem(PENDING_KEY, JSON.stringify({ mode, joinCode: code, details }));
    $("authSubmit").disabled = true;
    message("Enviando link de confirmação para seu e-mail…");
    try {
      const redirect = new URL(window.location.href);
      redirect.searchParams.set("mode", mode);
      if (code) redirect.searchParams.set("join", code);
      const { error } = await client.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true, emailRedirectTo: redirect.toString() }
      });
      if (error) throw error;
      message("Enviamos um link para " + email + ". Abra a mensagem no mesmo dispositivo ou navegador para concluir o acesso. O link expira; se não chegar, confira spam e tente novamente após 60 segundos.");
    } catch (error) {
      message(error.message || "Não foi possível enviar o e-mail.", true);
    } finally {
      $("authSubmit").disabled = false;
    }
  });

  $("studentJoinFirst").addEventListener("click", async () => {
    const code = $("studentFirstCode").value.trim().toUpperCase();
    const details = {
      name: $("studentFirstName").value.trim(),
      birth: $("studentFirstBirth").value || null,
      sex: $("studentFirstSex").value || null
    };
    if (!code || !details.name) return portalMessage("Informe o código da turma e seu nome completo.", true);
    portalMessage("Concluindo cadastro…");
    try {
      const joined = await joinClass(code, details);
      localStorage.removeItem(PENDING_KEY);
      $("studentWelcome").textContent = "Cadastro vinculado à turma: " + joined.class_name;
      $("studentPermanentId").textContent = joined.student_code;
      $("studentFirstJoin").hidden = true;
      portalMessage("Cadastro concluído. Seu identificador permanente foi criado.");
    } catch (error) { portalMessage(error.message, true); }
  });

  $("studentJoinAnother").addEventListener("click", async () => {
    const code = $("studentNewJoinCode").value.trim().toUpperCase();
    if (!code) return portalMessage("Informe o código recebido do professor.", true);
    portalMessage("Vinculando sua conta à turma…");
    try {
      const { data: student } = await client.from("students").select("display_name,birth_date,sex_reference").eq("auth_user_id", currentUser.id).maybeSingle();
      if (!student) throw new Error("Complete primeiro o cadastro pelo link de uma turma.");
      const joined = await joinClass(code, { name: student.display_name, birth: student.birth_date, sex: student.sex_reference });
      $("studentWelcome").textContent = "Você também está vinculado(a) à turma: " + joined.class_name;
      $("studentPermanentId").textContent = joined.student_code;
      $("studentNewJoinCode").value = "";
      portalMessage("Vínculo realizado. Seu identificador permaneceu o mesmo.");
    } catch (error) { portalMessage(error.message, true); }
  });
  $("studentSignOut").addEventListener("click", () => client.auth.signOut().then(() => window.location.reload()));
  $("signOut").addEventListener("click", () => client.auth.signOut().then(() => window.location.reload()));

  // Teacher class creation is handled here so each class gets its server-generated invitation code.
  document.addEventListener("submit", async event => {
    if (event.target?.id !== "ft") return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const name = $("tn").value.trim();
    if (!name) return;
    const year = $("ty").value ? Number($("ty").value) : null;
    const shift = $("tt").value || null;
    const submit = event.target.querySelector('button[type="submit"],button:not([type])');
    if (submit) submit.disabled = true;
    try {
      const { data, error } = await client.rpc("create_class_with_code", {
        p_id: crypto.randomUUID(), p_name: name, p_school_year: year, p_shift: shift
      });
      if (error) throw error;
      const row = Array.isArray(data) ? data[0] : data;
      event.target.reset();
      await loadTeacherClasses();
      const invite = window.location.origin + window.location.pathname + "?join=" + encodeURIComponent(row.join_code);
      alert("Turma criada. Código: " + row.join_code + "\n\nLink para os estudantes:\n" + invite);
    } catch (error) { alert("Não foi possível criar a turma: " + error.message); }
    finally { if (submit) submit.disabled = false; }
  }, true);

  // The teacher adds students through the invitation link, not by creating local-only records.
  document.addEventListener("submit", event => {
    if (event.target?.id !== "fa") return;
    event.preventDefault();
    event.stopImmediatePropagation();
    alert("Para manter o identificador permanente vinculado ao e-mail, o estudante deve se cadastrar pelo link/código da turma.");
  }, true);

  client.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") { window.location.reload(); return; }
    if (session?.user) {
      setTimeout(() => activateSession(session).catch(error => {
        finish(null, null);
        message("Falha ao preparar sua conta: " + error.message, true);
      }), 0);
    }
  });
  client.auth.getSession().then(({ data, error }) => {
    if (error) { message(error.message, true); finish(null, null); return; }
    if (!data.session) { finish(null, null); return; }
    activateSession(data.session).catch(error => {
      finish(null, null);
      message("Falha ao preparar sua conta: " + error.message, true);
    });
  });
})();