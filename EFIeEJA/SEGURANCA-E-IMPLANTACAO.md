# Segurança e implantação — EFIeEJA

## Estado
A interface v0.1 ainda usa localStorage. Este repositório inclui o esquema inicial para migrar para Supabase, mas ainda não há banco conectado nem autenticação ativa. Não inserir dados reais até concluir a implantação e os testes.

## Serviço escolhido
Supabase (PostgreSQL + Auth). O projeto deverá ser criado pelo proprietário da conta; não há credenciais disponíveis neste repositório.

## Passos para ativar
1. Criar um projeto Supabase dedicado ao EFIeEJA.
2. No SQL Editor, executar supabase/migrations/202611080001_initial_schema.sql.
3. Em Authentication, habilitar o método de login escolhido (recomendação inicial: e-mail/senha ou magic link).
4. Em URL Configuration, cadastrar a URL final do GitHub Pages como Site URL e Redirect URL.
5. Copiar Project URL e chave publishable/anon para supabase-config.js, criado localmente a partir de supabase-config.example.js. Nunca publicar service_role.
6. Conectar o frontend ao Supabase e substituir operações localStorage por operações autenticadas. Isso ainda precisa ser implementado e testado.
7. Testar com duas contas de professor: cada uma deve ser incapaz de ler, alterar ou apagar registros da outra.
8. Só depois de auditoria, política de privacidade, base legal, retenção e backup, avaliar uso com dados reais.

## Modelo de dados
- teacher_profiles: perfil do professor ligado a auth.users.
- classes: turmas pertencentes a um professor.
- students: cadastro mínimo de estudantes pertencente a um professor.
- enrollments: histórico de vínculo entre turma e estudante.
- assessments: seis momentos por estudante, medidas e modalidade cardiorrespiratória registrada.

## Proteções
- Row Level Security (RLS) habilitada em todas as tabelas.
- Políticas limitam operações ao auth.uid() do professor.
- Nenhuma política de acesso anônimo.
- Restrições de domínio e índices básicos.
- Dados de saúde exigem tratamento cuidadoso sob LGPD. A implantação deve ser aprovada pela rede de ensino/encarregado de dados e observar regras para crianças e adolescentes.

## Limitações
- Esquema inicial assume um professor como proprietário dos próprios registros; compartilhamento institucional não está ativado.
- Integração Google Classroom não incluída.
- Importação de planilhas e migração dos dados locais ainda precisam de fluxo de validação.
- A interface atual ainda não usa Supabase. A criação do esquema não significa banco em produção.
