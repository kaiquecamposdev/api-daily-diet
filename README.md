<div align="center">
<h1 align="center">
<img src="./public/Logo.svg" width="125" />
<br>api-daily-diet</h1>
<h3>◦ Fuel your code with the API Daily Diet!</h3>
<h3>◦ Developed with the software and tools below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/Vitest-6E9F18.svg?style&logo=Vitest&logoColor=white" alt="Vitest" />
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style&logo=TypeScript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Fastify-000000.svg?style&logo=Fastify&logoColor=white" alt="Fastify" />
</p>
<img src="https://img.shields.io/github/license/kaiquecamposdev/api-daily-diet?style&color=5D6D7E" alt="GitHub license" />
<img src="https://img.shields.io/github/last-commit/kaiquecamposdev/api-daily-diet?style&color=5D6D7E" alt="git-last-commit" />
<img src="https://img.shields.io/github/commit-activity/m/kaiquecamposdev/api-daily-diet?style&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/languages/top/kaiquecamposdev/api-daily-diet?style&color=5D6D7E" alt="GitHub top language" />
</div>

---

## 📖 Table of Contents
- [📖 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [📦 Features](#-features)
- [📂 Repository Structure](#-repository-structure)
- [⚙️ Modules](#modules)
- [🚀 Getting Started](#-getting-started)
    - [🔧 Installation](#-installation)
    - [🤖 Running api-daily-diet](#-running-api-daily-diet)
    - [🧪 Tests](#-tests)
    - [🔗 End-points](#-end-points)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👏 Acknowledgments](#-acknowledgments)

---


## 📍 Overview

This project is a backend API for managing daily diet information. It allows users to create, retrieve, update, and delete meals, as well as manage user accounts. The API enforces input validation, handles authentication, and interacts with a SQLite database. Its value proposition lies in providing a reliable and secure platform for users to track and manage their daily meals and dietary goals.

---

## 📦 Features

1. **User Management**
    - Creation of new users
    - Authentication of existing users

2. **Meal Management**
    - Creation of new meals
    - Recovery of all meals or a specific meal
    - Meal update
    - Exclusion of meals

3. **Entry Validation**
    - All user inputs are validated before being processed

4. **Authentication**
    - API endpoints are secured with Basic Auth authentication

5. **Data Persistence**
    - Data is stored in an SQLite database

---


## 📂 Repository Structure

```sh
└── api-daily-diet/
    ├── .env.example
    ├── .env.test.example
    ├── .eslintrc.json
    ├── .gitignore
    ├── README.md
    ├── db/
    │   └── migrations/
    ├── knexfile.ts
    ├── package-lock.json
    ├── package.json
    ├── src/
    │   ├── @types/
    │   ├── app.ts
    │   ├── controllers/
    │   ├── env/
    │   ├── middlewares/
    │   ├── server.ts
    │   ├── tests/
    │   └── utils/
    ├── tsconfig.json
    └── vitest.config.ts
```


---

## ⚙️ Modules

<details closed><summary>Root</summary>

| File                                                                                               | Summary                                                                                                                                                                                                                               |
| ---                                                                                                | ---                                                                                                                                                                                                                                   |
| [knexfile.ts](https://github.com/kaiquecamposdev/api-daily-diet/blob/main/knexfile.ts)             | The code exports the database configuration from the config file in the utils folder and makes it available for use in other parts of the codebase.                                                                                   |
| [.env.test.example](https://github.com/kaiquecamposdev/api-daily-diet/blob/main/.env.test.example) | The.env.test.example file contains environment variables used for testing the code. It includes variables for setting the node environment, database path, and port.                                                                  |
| [vitest.config.ts](https://github.com/kaiquecamposdev/api-daily-diet/blob/main/vitest.config.ts)   | The code in vitest.config.ts defines a configuration for the vitest library. It sets up an alias for the'@' path, pointing to the'./src' directory. This allows for easier import statements in the codebase using the defined alias. |

</details>

<details closed><summary>Src</summary>

| File                                                                                   | Summary                                                                                                                                                        |
| ---                                                                                    | ---                                                                                                                                                            |
| [app.ts](https://github.com/kaiquecamposdev/api-daily-diet/blob/main/src/app.ts)       | The code sets up a fastify server, registers user and meals controllers with their respective endpoints, and handles errors by sending appropriate responses.  |
| [server.ts](https://github.com/kaiquecamposdev/api-daily-diet/blob/main/src/server.ts) | This code sets up a server using the Express app, listening on the specified port from the environment variable. It logs a message when the server is running. |

</details>

<details closed><summary>Env</summary>

| File                                                                                     | Summary                                                                                                                                                                                                                                                                                                                                                                                      |
| ---                                                                                      | ---                                                                                                                                                                                                                                                                                                                                                                                          |
| [index.ts](https://github.com/kaiquecamposdev/api-daily-diet/blob/main/src/env/index.ts) | This code is responsible for loading and validating environment variables using dotenv and zod. It first determines the environment mode based on NODE_ENV and loads the appropriate.env file. Then it defines a schema for the expected variables and validates them. If validation fails, an error is thrown. The validated environment variables are exported for use in the application. |

</details>

<details closed><summary>@types</summary>

| File                                                                                          | Summary                                                                                                                                                                                                     |
| ---                                                                                           | ---                                                                                                                                                                                                         |
| [knex.d.ts](https://github.com/kaiquecamposdev/api-daily-diet/blob/main/src/@types/knex.d.ts) | The code defines the table structures for the'users' and'meals' tables in a database using the Knex library. It specifies the column names and their data types, such as strings, booleans, and timestamps. |

</details>

<details closed><summary>Middlewares</summary>

| File                                                                                                                                       | Summary                                                                                                                                                                                                         |
| ---                                                                                                                                        | ---                                                                                                                                                                                                             |
| [check-session-id-exist.ts](https://github.com/kaiquecamposdev/api-daily-diet/blob/main/src/middlewares/check-session-id-exist.ts)         | This code is a middleware function called checkSessionIdExist. It checks if a session_id exists in the cookies of a Fastify request. If it doesn't, it returns a 401 Unauthorized status with an error message. |
| [check-date-time-with-regex.ts](https://github.com/kaiquecamposdev/api-daily-diet/blob/main/src/middlewares/check-date-time-with-regex.ts) | The code is a middleware function that checks if the date and time provided in the request body match the specified regular expression patterns. It throws an error if the format is incorrect.                 |

</details>

<details closed><summary>Controllers</summary>

| File                                                                                                                 | Summary                                                                                                                                                                                                                                                                                                                            |
| ---                                                                                                                  | ---                                                                                                                                                                                                                                                                                                                                |
| [userController.ts](https://github.com/kaiquecamposdev/api-daily-diet/blob/main/src/controllers/userController.ts)   | The userController code is a module that handles user related operations. It allows creating a new user, retrieving all users, and deleting a user by their ID. It enforces input validation using zod schemas and encrypts user passwords with bcrypt. The code interacts with a database using the knex library.                 |
| [mealsController.ts](https://github.com/kaiquecamposdev/api-daily-diet/blob/main/src/controllers/mealsController.ts) | The mealsController code provides functionalities for creating, retrieving, updating, and deleting meals. It handles authentication, validates input, and performs database operations. Additionally, it allows querying meals based on various criteria such as total count, within diet status, and better sequence within diet. |

</details>

<details closed><summary>Utils</summary>

| File                                                                                                                                         | Summary                                                                                                                                                                                                                                                                                         |
| ---                                                                                                                                          | ---                                                                                                                                                                                                                                                                                             |
| [appError.ts](https://github.com/kaiquecamposdev/api-daily-diet/blob/main/src/utils/appError.ts)                                             | The code implements a class called AppError which is responsible for creating custom error objects. The class has properties for message and statusCode, with the option to provide a default statusCode of 400.                                                                                |
| [database.ts](https://github.com/kaiquecamposdev/api-daily-diet/blob/main/src/utils/database.ts)                                             | This code defines the database configuration, including the client (SQLite), connection path, and migration settings. It exports the Knex configuration object and an initialized Knex instance.                                                                                                |
| [returnBetterSequenceWithinDiet.ts](https://github.com/kaiquecamposdev/api-daily-diet/blob/main/src/utils/returnBetterSequenceWithinDiet.ts) | The code exports a function that takes an array of meals. It iterates over each meal and checks if it is within the diet. If a meal is within the diet, it adds it to a new sequence array. If a meal is not within the diet, it stops iterating and returns the sequence array and its length. |

</details>

<details closed><summary>Migrations</summary>

| File                                                                                                                                           | Summary                                                                                                                                                                                              |
| ---                                                                                                                                            | ---                                                                                                                                                                                                  |
| [20231101020634_add_session_id.ts](https://github.com/kaiquecamposdev/api-daily-diet/blob/main/db/migrations/20231101020634_add_session_id.ts) | This code adds a'session_id' column to the'meals' table in the database, with a UUID data type. The up function alters the table to add the column, while the down function removes the column.      |
| [20231026172247_create_users.ts](https://github.com/kaiquecamposdev/api-daily-diet/blob/main/db/migrations/20231026172247_create_users.ts)     | This code creates a "users" table in the database with columns for id, username, password, created_at, and updated_at. The "up" function creates the table, while the "down" function drops it.      |
| [20231026181210_create_meals.ts](https://github.com/kaiquecamposdev/api-daily-diet/blob/main/db/migrations/20231026181210_create_meals.ts)     | The code defines a migration to create a "meals" table in a database. The table has columns for id, user_id, name, description, date, time, and withinDiet. It also includes columns for timestamps. |

</details>

---

## 🚀 Getting Started

### 🔧 Installation

1. Clone the api-daily-diet repository:
```sh
git clone https://github.com/kaiquecamposdev/api-daily-diet
```

2. Change to the project directory:
```sh
cd api-daily-diet
```

3. Install the dependencies:
```sh
npm install
```

### 🤖 Running api-daily-diet

```sh
npm run build && node dist/main.js
```

### 🧪 Tests
```sh
npm run test
```

---

### 🔗 End-points

#### Users Controller

1. **Create a user**
   - **Endpoint:** `/api/users`
   - **Method:** `POST`
   - **Body:** `
    {
        "username": "User",
        "password": "User123"
    }
    `
   - **Description:** Creates a new user. The body of the request must include the user details.

#### Meals Controller

1. **Create a meal**
   - **Endpoint:** `/api/meals`
   - **Method:** `POST`
   - **Body:** `
    {
        "name": "Meal", 
        "description": "Meal description",
        "date": "12/12/2023",
        "time": "00:00:00",
        "withinDiet": false,
    }
    `
   - **Description:** Creates a new meal. The body of the request must include meal details.

2. **List all meals**
   - **Endpoint:** `/api/meals`
   - **Method:** `GET`
   - **Header:** `
    {
        'Authorization': 'Basic ' + encodedCredentials
    }
   `
   - **Description:** Returns a list of all meals. Must pass username + password encrypt in base64.

3. **List a totalRegister the user**
   - **Endpoint:** `/api/meals/?totalRegister=true`
   - **Method:** `GET`
   - **Header:** `
    {
        'Authorization': 'Basic ' + encodedCredentials
    }
   `
   - **Description:** Returns the details of a specific meal. Meal ID must be provided in the URL. Must pass username + password encrypt in base64.

4. **List a totalWithinDiet the user**
   - **Endpoint:** `/api/meals/?totalWithinDiet=true`
   - **Method:** `GET`
   - **Header:** `
    {
        'Authorization': 'Basic ' + encodedCredentials
    }
   `
   - **Description:** Returns the details of a specific meal. Meal ID must be provided in the URL. Must pass username + password encrypt in base64.

5. **List a totalWithoutDiet the user**
   - **Endpoint:** `/api/meals/?totalWithoutDiet=true`
   - **Method:** `GET`
   - **Header:** `
    {
        'Authorization': 'Basic ' + encodedCredentials
    }
   `
   - **Description:** Returns the details of a specific meal. Meal ID must be provided in the URL. Must pass username + password encrypt in base64.

6. **List a totalRegister the user**
   - **Endpoint:** `/api/meals/?betterSequenceWithinDiet=true`
   - **Method:** `GET`
   - **Header:** `
    {
        'Authorization': 'Basic ' + encodedCredentials
    }
   `
   - **Description:** Returns the details of a specific meal. Meal ID must be provided in the URL. Must pass username + password encrypt in base64.

7. **Update a specific meal**
   - **Endpoint:** `/api/meals/:id`
   - **Method:** `PUT`
   - **Header:** `
    {
        'Authorization': 'Basic ' + encodedCredentials
    }
   `
   - **Body:** `
    {
        "name": "Meal1", 
        "description": "Meal1 description",
        "date": "01/01/2024",
        "time": "00:00:00",
        "withinDiet": true,
    }
    `
   - **Description:** Updates details for a specific meal. The meal ID must be provided in the URL and the new meal details must be included in the request body. Must pass username + password encrypt in base64.

8. **Delete a specific meal**
   - **Endpoint:** `/api/meals/:id`
   - **Method:** `DELETE`
   - **Header:** `
    {
        'Authorization': 'Basic ' + encodedCredentials
    }
   `
   - **Description:** Deletes a specific meal. Meal ID must be provided in the URL. Must pass username + password encrypt in base64.

## 🤝 Contributing

Contributions are always welcome! Please follow these steps:

1. Fork the project repository. This creates a copy of the project on your account that you can modify without affecting the original project.

2. Clone the forked repository to your local machine using a Git client like Git or GitHub Desktop.

3. Create a new branch with a descriptive name (e.g., `new-feature-branch` or `bugfix-issue-123`).

```sh
git checkout -b new-feature-branch
```
4. Make changes to the project's codebase.

5. Commit your changes to your local branch with a clear commit message that explains the changes you've made.

```sh
git commit -m 'Implemented new feature.'
```
6. Push your changes to your forked repository on GitHub using the following command.

```sh
git push origin new-feature-branch
```

7. Create a new pull request to the original project repository. In the pull request, describe the changes you've made and why they're necessary.
The project maintainers will review your changes and provide feedback or merge them into the main branch.

---

## 📄 License

This project is licensed under the `ℹ️  MIT` License. See the [LICENSE-Type](LICENSE) file for additional info.

---

[↑ Return](#Top)