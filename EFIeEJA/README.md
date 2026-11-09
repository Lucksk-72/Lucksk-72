# EFIeEJA

Aplicativo para registro e acompanhamento longitudinal de indicadores relacionados à saúde.

## Aplicativo

Abra `index.html` em um servidor HTTP local ou publique a pasta `EFIeEJA` para testar. O aplicativo agora exige autenticação pelo Supabase antes de liberar a interface.

## Autenticação e segurança

- Supabase Auth com cadastro, login por e-mail/senha, recuperação de senha e encerramento de sessão.
- Login Google e fluxo de autorização do Google Sala de Aula.
- A conexão inicial com o Classroom solicita somente leitura de turmas e listas de participantes.
- O banco Supabase possui tabelas para professores, turmas, estudantes, histórico de matrículas, avaliações e metadados da conexão Classroom.
- Row Level Security (RLS) restringe cada registro ao professor autenticado.
- A chave publishable é pública por definição e está no cliente; nenhuma chave `service_role` ou segredo OAuth deve ser colocado no repositório.

### Configuração necessária

Consulte [GOOGLE_CLASSROOM_SETUP.md](./GOOGLE_CLASSROOM_SETUP.md) para configurar o provedor Google no Supabase e no Google Cloud Console. O Client ID e o Client Secret devem ser cadastrados diretamente nos painéis oficiais, nunca no código.

## Estado da integração — importante

A autenticação e a estrutura inicial do banco foram preparadas. O aplicativo ainda mantém os cadastros e avaliações no armazenamento local do navegador, com chave separada por conta autenticada. A sincronização CRUD completa entre a interface e as tabelas Supabase ainda precisa ser implementada e validada. **Não inserir dados reais ou identificáveis de estudantes até a conclusão dessa etapa.**

O acesso ao Google Sala de Aula já solicita consentimento e tenta listar as turmas ativas. A importação de estudantes e o vínculo automático entre turmas do Classroom e turmas EFIeEJA ainda são etapas futuras e dependem da configuração OAuth do Google.

## Funcionalidades do protótipo

- Cadastro de turmas e estudantes.
- Seis momentos avaliativos.
- Registro de peso, estatura, cintura e quadril.
- Cálculo automático de IMC, RCQ e relação cintura-estatura.
- Caminhada de 6 minutos ou corrida/caminhada de 12 minutos.
- Histórico individual, exportação CSV e backup/restauração JSON.
- Protocolos resumidos e diferenças em relação ao texto de 2011.

## Arquivos

- `index.html`: interface do aplicativo.
- `supabase-auth.js`: autenticação, proteção da interface e autorização inicial do Classroom.
- `GOOGLE_CLASSROOM_SETUP.md`: instruções para configurar OAuth do Google.
- `manual/manual-blogspot.html`: manual HTML para Blogger.

EFIeEJA é independente do jogo Coleta dos Reinos.
