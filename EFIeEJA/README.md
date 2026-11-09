# EFIeEJA

Aplicativo para registro e acompanhamento longitudinal de indicadores de saúde e aptidão física de estudantes da Educação Física no Ensino Fundamental e na Educação de Jovens e Adultos.

## Objetivo

Organizar informações das turmas e dos estudantes, registrar medidas e testes de avaliação relacionados à saúde e acompanhar a evolução individual ao longo de seis momentos avaliativos distribuídos por seis semestres (três anos).

## Escopo inicial acordado

- Cadastro de escolas, turmas e estudantes.
- Registro de dados iniciais e histórico individual.
- Seis momentos de avaliação ao longo de três anos.
- Registro de medidas antropométricas e cálculo automático de indicadores.
- Duas opções de avaliação cardiorrespiratória: caminhada de 6 minutos e corrida/caminhada de 12 minutos.
- Relatórios individuais e por turma, com evolução longitudinal.
- Possibilidade futura de importar estudantes do Google Classroom, mediante autorização e integração apropriada.

## Princípios

1. Priorizar indicadores relacionados à saúde, não classificações de desempenho esportivo.
2. Utilizar protocolos simples, executáveis pelo professor durante as aulas, com materiais comuns.
3. Guardar sempre os resultados brutos, além dos indicadores calculados.
4. Registrar o protocolo e a versão dos critérios usados em cada avaliação.
5. Não comparar diretamente resultados obtidos em testes cardiorrespiratórios diferentes.
6. Não tratar classificações de triagem como diagnóstico clínico.
7. Proteger os dados pessoais dos estudantes, com atenção especial aos menores de idade.

## Situação

Este repositório contém a documentação inicial do projeto e as decisões já tomadas. Os protocolos e critérios de referência ainda precisam de validação final antes da implementação do sistema.

## Estrutura

- `docs/bateria-saude.md`: bateria de avaliação acordada.
- `docs/requisitos-funcionais.md`: funcionalidades previstas.
- `docs/decisoes-pendentes.md`: pontos que precisam ser definidos antes da implementação.

## Separação de projetos

EFIeEJA é independente do jogo educativo Coleta dos Reinos. Nenhum código ou dado daquele projeto deve ser incorporado aqui sem decisão explícita.
