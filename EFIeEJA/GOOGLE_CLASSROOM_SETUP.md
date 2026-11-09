# Configuração do Google Sala de Aula — EFIeEJA

O EFIeEJA usa Supabase Auth para autenticar o professor e solicita separadamente autorização OAuth para consultar turmas e listas do Google Sala de Aula. A versão inicial solicita somente permissões de leitura:

- `classroom.courses.readonly`: consultar cursos/turmas.
- `classroom.rosters.readonly`: consultar participantes/estudantes das turmas.

Não são solicitadas permissões para alterar notas, criar atividades ou modificar turmas.

## 1. Ativar o provedor Google no Supabase

1. Abra [Authentication → Providers → Google](https://supabase.com/dashboard/project/elehwtzcvdxsxyjjfvyw/auth/providers).
2. Ative Google.
3. No Google Cloud Console, crie ou selecione um projeto e habilite a **Google Classroom API**.
4. Configure a tela de consentimento OAuth e cadastre os usuários de teste enquanto o aplicativo estiver em modo de teste.
5. Crie uma credencial OAuth do tipo **Web application**.
6. Cadastre como URI de redirecionamento autorizada:
   `https://elehwtzcvdxsxyjjfvyw.supabase.co/auth/v1/callback`
7. Copie o Client ID e Client Secret para os campos do provedor Google no painel do Supabase e salve.

O Client Secret deve ser inserido diretamente no painel do Supabase/Google Cloud. **Não o coloque no GitHub, no HTML, no JavaScript nem nesta conversa.**

## 2. URLs de retorno

No Supabase, em Authentication → URL Configuration, configure a URL pública real do EFIeEJA como Site URL e inclua-a em Redirect URLs. Enquanto o repositório continuar privado e não houver endereço de hospedagem confirmado, não invente uma URL de produção. Para testes locais, inclua o endereço local que estiver usando, por exemplo `http://localhost:5500/**`.

## 3. Consentimento e verificação

O primeiro acesso pelo Google solicita consentimento para as permissões de leitura acima. Para disponibilizar o aplicativo a usuários fora da lista de teste, pode ser necessário publicar/verificar a tela de consentimento e justificar os escopos do Google Classroom. A aprovação depende do Google.

## 4. O que a conexão inicial faz

Após o retorno OAuth, o EFIeEJA tenta listar as turmas ativas da conta Google e registra apenas metadados da conexão no Supabase. O token OAuth não é gravado na tabela de conexão. A importação/sincronização de estudantes e a associação entre turmas do Classroom e turmas internas são etapas posteriores.

## 5. Segurança e dados escolares

As tabelas do EFIeEJA têm Row Level Security (RLS), vinculando os registros ao usuário autenticado. A chave publishable incluída no front-end é pública por definição; a proteção depende das políticas RLS. Nunca exponha a chave `service_role`.

A versão atual ainda mantém os registros pedagógicos no armazenamento local do navegador. A autenticação já separa o espaço local por conta, mas **a sincronização completa dos cadastros e avaliações com o banco ainda precisa ser implementada e testada antes de inserir dados reais de estudantes**.