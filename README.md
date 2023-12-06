## 📖 API Rules:

1. Only the project creator can add or remove members.
2. Tasks can only be created by members of the project to which the task belongs.
3. A user can only be added to a project if they are already registered on the platform.
4. Completed tasks cannot be edited.
5. Tasks must have tags

## 💻 Technologies:

- Node.js with TypeScript
- PostgreSQL
- Prism ORM

### </>. API Modeling:

#### User (`User`):

- ID: Automatically generated ID.
- Name: Text.
- Email: Text, unique.
- Password: Text, encrypted.

#### Project (`Project`):

- ID: Automatically generated ID.
- Name: Text.
- Description: Text.
- Members: List of users associated with the project.

#### Task (`Task`):

- ID: Automatically generated ID.
- Title: Text, maximum 255 characters.
- Description: Text.
- Creation date: Date and time, automatically generated.
- Status: Enum (Pending, In progress, Completed).
- Project: Reference to the project to which it belongs.

#### Tag (`Tag`):

- ID: Automatically generated ID.
- Title: Text.
- Task: Reference to the task to which it belongs.

## ⚙️ Configuration for execution:

- Have docker and docker-compose installed.
- Create a .env file in the project root with the following variables.
```
POSTGRES_HOST= 
POSTGRES_PORT= 
POSTGRES_USER= 
POSTGRES_PASSWORD= 
POSTGRES_DB= 
DATABASE_URL= postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public
```

