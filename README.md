# API Daily Diet🍴

This project is a backend API for managing daily diet information. It allows users to create, retrieve, update, and delete meals, as well as manage user accounts. The API enforces input validation, handles authentication, and interacts with a SQLite database. Its value proposition lies in providing a reliable and secure platform for users to track and manage their daily meals and dietary goals.

## Features ✨

- **User Management:**
    - **Creating new users:** Allows new users to register on the platform, setting a username and password.
    - **Authenticating existing users:** Implements basic authentication to ensure that only authorized users can access API resources.
- **Meal Management:**
    - **Creating new meals:** Allows users to log their meals, including name, description, date, time, and whether the meal is within the diet.
    - **Retrieving all meals or a specific meal:** Allows users to consult their meal history, filtering by date, time, or diet status.
    - **Updating meals:** Allows users to edit the information of their meals, such as name, description, date, time, and diet status.
    - **Deleting meals:** Allows users to remove meals from the history.
- **Input Validation:**
    - **Validating all user input data:** Ensures the integrity of the data entered, preventing errors and ensuring the consistency of the database.
- **Authentication:**
    - **Basic Authentication:** Ensures the security of API requests, ensuring that only authenticated users have access to resources.
- **Data Persistence:**
    - **SQLite database:** Stores user and meal data securely and efficiently. 

## Installation 🚀

1. **Clone the api-daily-diet repository:**

   ```bash
   git clone https://github.com/kaiquecamposdev/api-daily-diet
   ```

   or

   ```bash
   gh repo clone kaiquecamposdev/api-daily-diet
   ```

2. **Install the dependencies:**

   ```bash
   cd api-daily-diet && npm install
   ```

### Configuring Environment Variables ⚙️ 

1. **Create the `.env` and `.env.test` files:**

   - Create a `.env` file in the project root for development environment variables.
   - Create a `.env.test` file in the project root for test environment variables.

2. **Set the environment variables:**

   - **`.env`:**

     ```
     NODE_ENV=development
     DATABASE_PATH=./src/database/db.sqlite 
     PORT=3000 
     ```

   - **`.env.test`:**

     ```
     NODE_ENV=test
     DATABASE_PATH=./src/database/db.test.sqlite 
     PORT=3001 
     ```

### Getting Started 🚀

1. **Running the migrations:**
```bash
npx knex migrate:latest
```
2. **Start the development server:**
```bash
npm run dev
```
3. **Access it at `http://localhost:3000`.** 

### Tests 🧪

1. **Running the migrations**
```bash
npx knex migrate:latest --env test
```
2. **Running the tests**
```bash
npm run test
```

## Endpoints 🔗

### User Controller

- **Create a user:**

  ```
  Endpoint: /api/users
  Method: POST
  Body:  { "username": "User", "password": "User123"  } 
  Description: Creates a new user. The request body must include the user details.
  ```

### Meal Controller

- **Create a meal:**

  ```
  Endpoint: /api/meals
  Method: POST
  Body:  { "name": "Meal",  "description": "Meal description", "date": "12/12/2023", "time": "00:00:00", "withinDiet": false,  } 
  Description: Creates a new meal. The request body must include the meal details.
  ```

- **List all meals:**

  ```
  Endpoint: /api/meals
  Method: GET
  Header:  { 'Authorization': 'Basic ' + encodedCredentials  }
  Description: Returns a list of all meals. Must pass the username and password encrypted in base64.
  ```

- **List all meals within the diet:**

  ```
  Endpoint: /api/meals/?totalWithinDiet=true
  Method: GET
  Header:  { 'Authorization': 'Basic ' + encodedCredentials  }
  Description: Returns a list of all meals within the diet. Must pass the username and password encrypted in base64.
  ```

- **List all meals outside the diet:**

  ```
  Endpoint: /api/meals/?totalWithoutDiet=true
  Method: GET
  Header:  { 'Authorization': 'Basic ' + encodedCredentials  }
  Description: Returns a list of all meals outside the diet. Must pass the username and password encrypted in base64.
  ```

- **List all meals of the user:**

  ```
  Endpoint: /api/meals/?totalRegister=true
  Method: GET
  Header:  { 'Authorization': 'Basic ' + encodedCredentials  }
  Description: Returns the list of all meals of the user. Must pass the username and password encrypted in base64.
  ```

- **Update a specific meal:**

  ```
  Endpoint: /api/meals/:id
  Method: PUT
  Header:  { 'Authorization': 'Basic ' + encodedCredentials  }
  Body:  { "name": "Meal1",  "description": "Meal1 description", "date": "01/01/2024", "time": "00:00:00", "withinDiet": true,  } 
  Description: Updates the details of a specific meal. The meal ID must be provided in the URL and the new meal details must be included in the request body. Must pass the username and password encrypted in base64.
  ```

- **Delete a specific meal:**

  ```
  Endpoint: /api/meals/:id
  Method: DELETE
  Header:  { 'Authorization': 'Basic ' + encodedCredentials  }
  Description: Deletes a specific meal. The meal ID must be provided in the URL. Must pass the username and password encrypted in base64.
  ```

### Contributing 🤝

Contributions to the project are welcome! Feel free to open issues or submit pull requests.

### License 📝

This project is licensed under the [MIT License](./LICENSE).
