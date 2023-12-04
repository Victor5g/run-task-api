## 📖 Regras API:

1. Somente o criador do projeto pode adicionar ou remover membros.
2. Tarefas só podem ser criadas por membros do projeto ao qual a tarefa pertence.
3. Um usuário só pode ser adicionado a um projeto se ele já estiver registrado na plataforma.
4. Tarefas concluídas não podem ser editadas.
5. As tarefas precisam ter tags

## 💻 Tecnologias:

- Node.js com TypeScript
- PostgreSQL
- Prisma ORM

### </>. Modelagem da API:

#### Usuário (`User`):

- ID: ID gerado automaticamente.
- Nome: Texto.
- Email: Texto, único.
- Senha: Texto, encriptada.

#### Projeto (`Project`):

- ID: ID gerado automaticamente.
- Nome: Texto.
- Descrição: Texto.
- Membros: Lista de usuários associados ao projeto.

#### Tarefa (`Task`):

- ID: ID gerado automaticamente.
- Título: Texto, máximo de 255 caracteres.
- Descrição: Texto.
- Data de criação: Data e hora, gerada automaticamente.
- Status: Enum (Pendente, Em andamento, Concluída).
- Projeto: Referência ao projeto ao qual pertence.

#### Tag (`Tag`):

- ID: ID gerado automaticamente.
- Título: Texto.
- Tarefa: Referência a tarefa ao qual pertence.

### 4. Validações e Erros:

- Implemente validações para garantir a integridade dos dados.
- Responda com mensagens de erro claras e status HTTP apropriados.
