(() => {
  const SUPABASE_URL = "https://elehwtzcvdxsxyjjfvyw.supabase.co";
  const SUPABASE_KEY = "sb_publishable_4A2GbN3nbIGQrOyCZNhB1Q__FzN_W2I";
  const CLASSROOM_SCOPES = [
    "https://www.googleapis.com/auth/classroom.courses.readonly",
    "https://www.googleapis.com/auth/classroom.rosters.readonly"
  ].join(" ");
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
  window.EFIEEJA_SUPABASE = client;
  let resolveReady;
  window.EFIEEJA_AUTH_READY = new Promise(resolve => { resolveReady = resolve; });
  let readyResolved = false;
  let lastSession = null;

  const $ = id => document.getElementById(id);
  const showMessage = (message, isError = false) => {
    const el = $("authMessage");
    if (!el) return;
    el.textContent = message;
    el.style.color = isError ? "#9a3333" : "#315e4d";
  };
  const finishReady = session => {
    if (!session?.user) return;
    window.EFIEEJA_USER_ID = session.user.id;
    if (!readyResolved) {
      readyResolved = true;
      resolveReady(session);
    }
  };
  const showSession = session => {
    lastSession = session;
    const signedIn = !!session?.user;
    $("authGate").hidden = signedIn;
    $("appRoot").hidden = !signedIn;
    $("sessionBar").hidden = !signedIn;
    if (signedIn) {
      $("sessionEmail").textContent = session.user.email || "Conta autenticada";
      finishReady(session);
    } else if (!readyResolved) {
      readyResolved = true;
      resolveReady(null);
    }
  };
  const classroomResult = message => {
    const panel = $("classroomPanel");
    const output = $("classroomCourses");
    panel.classList.remove("hide");
    output.textContent = message;
  };
  const listClassroomCourses = async session => {
    const token = session?.provider_token;
    if (!token) {
      classroomResult("A conta está autenticada, mas não há token do Google Classroom nesta sessão. Clique em “Conectar Google Sala de Aula” para conceder a autorização.");
      return;
    }
    classroomResult("Consultando suas turmas no Google Sala de Aula…");
    try {
      const response = await fetch("https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE&pageSize=100", {
        headers: { Authorization: "Bearer " + token }
      });
      const payload = await response.json();
      if (!response.ok) {
        classroomResult("O Google recusou a consulta (" + response.status + "): " + (payload.error?.message || "verifique as permissões concedidas."));
        return;
      }
      const courses = payload.courses || [];
      const out = $("classroomCourses");
      out.replaceChildren();
      if (!courses.length) {
        out.textContent = "Autorização concluída. Nenhuma turma ativa foi retornada para esta conta.";
      } else {
        const title = document.createElement("p");
        title.textContent = "Conexão confirmada. Turmas ativas encontradas: " + courses.length;
        out.appendChild(title);
        const list = document.createElement("ul");
        courses.forEach(course => {
          const item = document.createElement("li");
          item.textContent = course.name + (course.section ? " — " + course.section : "");
          list.appendChild(item);
        });
        out.appendChild(list);
      }
      const identity = session.user.identities?.find(item => item.provider === "google");
      const scopes = CLASSROOM_SCOPES.split(" ");
      const { error: saveError } = await client.from("google_classroom_connections").upsert({
        teacher_id: session.user.id,
        google_subject: identity?.identity_data?.sub || identity?.id || null,
        google_email: session.user.email || null,
        granted_scopes: scopes,
        connected_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      if (saveError) console.warn("Não foi possível registrar os metadados da conexão Classroom:", saveError.message);
    } catch (error) {
      classroomResult("Não foi possível consultar o Google Sala de Aula: " + error.message);
    }
  };

  $("authForm").addEventListener("submit", async event => {
    event.preventDefault();
    const email = $("authEmail").value.trim();
    const password = $("authPassword").value;
    $("authSubmit").disabled = true;
    showMessage("Aguarde…");
    try {
      if ($("authMode").value === "signup") {
        const { data, error } = await client.auth.signUp({ email, password });
        if (error) throw error;
        if (!data.session) showMessage("Cadastro recebido. Verifique seu e-mail para confirmar a conta e depois entre no EFIeEJA.");
        else showMessage("Conta criada.");
      } else {
        const { error } = await client.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (error) {
      showMessage(error.message, true);
    } finally {
      $("authSubmit").disabled = false;
    }
  });
  $("authMode").addEventListener("change", () => {
    $("authSubmit").textContent = $("authMode").value === "signup" ? "Criar conta" : "Entrar";
  });
  $("googleLogin").addEventListener("click", async () => {
    showMessage("Redirecionando para o Google…");
    const { error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.href.split("#")[0],
        scopes: CLASSROOM_SCOPES,
        queryParams: { access_type: "offline", prompt: "consent" }
      }
    });
    if (error) showMessage(error.message, true);
  });
  $("classroomConnect").addEventListener("click", async () => {
    showMessage("Solicitando autorização do Google Sala de Aula…");
    const hasGoogleIdentity = lastSession?.user?.identities?.some(item => item.provider === "google");
    const options = {
      redirectTo: window.location.href.split("#")[0],
      scopes: CLASSROOM_SCOPES,
      queryParams: { access_type: "offline", prompt: "consent" }
    };
    const result = hasGoogleIdentity
      ? await client.auth.signInWithOAuth({ provider: "google", options })
      : await client.auth.linkIdentity({ provider: "google", options });
    if (result.error) showMessage(result.error.message, true);
  });
  $("signOut").addEventListener("click", async () => {
    const { error } = await client.auth.signOut();
    if (error) showMessage(error.message, true);
    else window.location.reload();
  });
  $("forgotPassword").addEventListener("click", async () => {
    const email = $("authEmail").value.trim();
    if (!email) return showMessage("Informe seu e-mail antes de solicitar a recuperação.", true);
    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.href.split("#")[0]
    });
    showMessage(error ? error.message : "Se o e-mail estiver cadastrado, você receberá um link de recuperação.");
  });

  client.auth.onAuthStateChange((event, session) => {
    showSession(session);
    if (event === "SIGNED_OUT") {
      window.EFIEEJA_USER_ID = null;
      window.location.reload();
      return;
    }
    if (event === "PASSWORD_RECOVERY") {
      const newPassword = window.prompt("Digite a nova senha (mínimo de 8 caracteres):");
      if (newPassword) {
        client.auth.updateUser({ password: newPassword }).then(({ error }) => {
          showMessage(error ? error.message : "Senha atualizada. Entre novamente.");
        });
      }
    }
    if (session?.provider_token && ["SIGNED_IN", "USER_UPDATED", "INITIAL_SESSION"].includes(event)) {
      Promise.resolve().then(() => listClassroomCourses(session));
    }
  });

  client.auth.getSession().then(({ data, error }) => {
    if (error) showMessage(error.message, true);
    showSession(data?.session || null);
  });
})();