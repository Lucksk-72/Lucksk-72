# Requisitos funcionais iniciais

## Organização escolar

- Cadastrar escola e informações institucionais.
- Cadastrar turmas, ano/série, turno e ano letivo.
- Cadastrar estudantes e manter um perfil longitudinal que não seja perdido quando mudarem de turma ou ano.
- Permitir inclusão manual e avaliar importação por planilha CSV.
- Estudar integração com Google Classroom como etapa posterior, mediante OAuth e autorização do responsável pela conta.

## Avaliações

- Organizar seis momentos avaliativos, um por semestre ao longo de três anos.
- Permitir registrar uma avaliação inicial e os resultados de cada momento posterior.
- Registrar data, turma, estudante, professor responsável, protocolo, versão do protocolo e observações pertinentes.
- Registrar os valores brutos das medidas e dos testes.
- Calcular automaticamente IMC, RCQ e relação cintura-estatura.
- Permitir selecionar caminhada de 6 minutos ou corrida/caminhada de 12 minutos.
- Não misturar nem comparar diretamente resultados de modalidades diferentes.
- Manter o histórico mesmo quando um estudante muda de turma ou de modalidade de teste.

## Relatórios

- Ficha individual com histórico dos seis momentos.
- Gráficos de evolução individual.
- Resumo por turma, com cuidado para não expor publicamente dados individuais.
- Exportação dos registros para formatos comuns, conforme permissões.
- Identificação clara de dados ausentes, avaliações não realizadas e alterações de protocolo.

## Segurança e privacidade

- Não utilizar dados reais de estudantes em protótipos públicos.
- Prever autenticação e controle de acesso antes de armazenar dados reais.
- Restringir o acesso aos dados individuais aos profissionais autorizados.
- Planejar cópias de segurança, exportação e recuperação dos dados.
- Considerar a LGPD e os cuidados adicionais relativos a dados de crianças e adolescentes.

## Fora do escopo inicial

- Diagnóstico médico ou emissão de atestado de saúde.
- Ranking público de estudantes.
- Classificações de desempenho esportivo sem relação direta com os objetivos de saúde.
- Integração automática com Google Classroom antes de definir permissões, segurança e fluxo de autorização.
