# API Daily Diet 🍴
Este projeto é uma API backend para gerenciar informações diárias sobre sua dieta. Ele permite que os usuários criem, recuperem, atualizem e excluam refeições, além de gerenciar contas de usuário. A API aplica validação de entrada, lida com autenticação e interage com um banco de dados SQLite. Sua proposta de valor está em fornecer uma plataforma confiável e segura para os usuários rastrearem e gerenciarem suas refeições diárias e seus objetivos dietéticos.
### Recursos 📦
- **Gerenciamento de Usuários:**
    - **Criação de novos usuários:** Permite que novos usuários se registrem na plataforma, definindo um nome de usuário e senha.
    - **Autenticação de usuários existentes:** Implementa autenticação básica para garantir que apenas usuários autorizados possam acessar os recursos da API.
- **Gerenciamento de Refeições:**
    - **Criação de novas refeições:** Permite que os usuários registrem suas refeições, incluindo nome, descrição, data, hora e se a refeição está dentro da dieta. Recuperação de todas as refeições ou de uma refeição específica: Permite aos usuários consultar o histórico de suas refeições, filtrando por data, hora ou status da dieta.
    - **Atualização de refeições:** Permite que os usuários editem as informações de suas refeições, como nome, descrição, data, hora e status da dieta.
    - **Exclusão de refeições:** Permite que os usuários removam refeições do histórico.
    - **Validação de Entrada:** Validação de todos os dados de entrada do usuário: Assegura a integridade dos dados inseridos, evitando erros e garantindo a consistência do banco de dados.
- **Autenticação:**
    - **Autenticação básica:** Assegura a segurança das requisições da API, garantindo que apenas usuários autenticados tenham acesso aos recursos.
- **Persistência de Dados:**
    - **Banco de dados SQLite:** Armazena os dados de usuários e refeições de forma segura e eficiente.
### Tecnologias Utilizadas 💻
- **Node.js:** Ambiente de execução JavaScript para desenvolvimento de aplicações backend.
- **Fastify:** Framework web leve e rápido para Node.js que facilita a criação de APIs RESTful.
- **SQLite:** Banco de dados leve e sem servidor, ideal para projetos pequenos e médios.
- **Vitest:** Framework de teste rápido e versátil para JavaScript, permitindo a criação de testes unitários e de integração.
- **Zod:** Biblioteca de validação de dados TypeScript, para garantir a segurança e integridade dos dados.
- **Bcrypt:** Biblioteca para hashing de senhas, garantindo a segurança das credenciais.
- **JSON Web Token (JWT):**  Para a geração de tokens de autenticação, garantindo a segurança das requisições.
- **TypeScript:** Linguagem de tipagem estática para JavaScript, adicionando segurança e organização ao código.
### Instalação 🚀
1. **Clone o repositório api-daily-diet:**
```bash
git clone https://github.com/kaiquecamposdev/api-daily-diet.git
```
ou
```bash
gh repo clone kaiquecamposdev/api-daily-diet
```
2. **Instale as dependências:**
```bash
cd api-daily-diet && npm i
```
3. **Executando as migrations:**
```bash
npx knex migrate:latest
```
4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```
4. **Acesse em `http://localhost:`.** 
### Testes 🧪
1. **Executando as migrations**
```bash
npx knex migrate:latest --env test
```
2. **Executando os testes**
```bash
npm run test
```
## Endpoints 🔗

### Controlador de Usuários

- **Criar um usuário:**

  ```
  Endpoint: /api/users
  Método: POST
  Body:  { "username": "User", "password": "User123"  } 
  Descrição: Cria um novo usuário. O corpo da requisição deve incluir os detalhes do usuário.
  ```

### Controlador de Refeições

- **Criar uma refeição:**

  ```
  Endpoint: /api/meals
  Método: POST
  Body:  { "name": "Meal",  "description": "Meal description", "date": "12/12/2023", "time": "00:00:00", "withinDiet": false,  } 
  Descrição: Cria uma nova refeição. O corpo da requisição deve incluir os detalhes da refeição.
  ```

- **Listar todas as refeições:**

  ```
  Endpoint: /api/meals
  Método: GET
  Header:  { 'Authorization': 'Basic ' + encodedCredentials  }
  Descrição: Retorna uma lista de todas as refeições. Deve passar o nome de usuário e a senha criptografados em base64.
  ```

- **Listar todas as refeições dentro da dieta:**

  ```
  Endpoint: /api/meals/?totalWithinDiet=true
  Método: GET
  Header:  { 'Authorization': 'Basic ' + encodedCredentials  }
  Descrição: Retorna uma lista de todas as refeições dentro da dieta. Deve passar o nome de usuário e a senha criptografados em base64.
  ```

- **Listar todas as refeições fora da dieta:**

  ```
  Endpoint: /api/meals/?totalWithoutDiet=true
  Método: GET
  Header:  { 'Authorization': 'Basic ' + encodedCredentials  }
  Descrição: Retorna uma lista de todas as refeições fora da dieta. Deve passar o nome de usuário e a senha criptografados em base64.
  ```

- **Listar todas as refeições do usuário:**

  ```
  Endpoint: /api/meals/?totalRegister=true
  Método: GET
  Header:  { 'Authorization': 'Basic ' + encodedCredentials  }
  Descrição: Retorna a lista de todas as refeições do usuário. Deve passar o nome de usuário e a senha criptografados em base64.
  ```

- **Atualizar uma refeição específica:**

  ```
  Endpoint: /api/meals/:id
  Método: PUT
  Header:  { 'Authorization': 'Basic ' + encodedCredentials  }
  Body:  { "name": "Meal1",  "description": "Meal1 description", "date": "01/01/2024", "time": "00:00:00", "withinDiet": true,  } 
  Descrição: Atualiza os detalhes de uma refeição específica. O ID da refeição deve ser fornecido na URL e os novos detalhes da refeição devem ser incluídos no corpo da requisição. Deve passar o nome de usuário e a senha criptografados em base64.
  ```

- **Excluir uma refeição específica:**

  ```
  Endpoint: /api/meals/:id
  Método: DELETE
  Header:  { 'Authorization': 'Basic ' + encodedCredentials  }
  Descrição: Exclui uma refeição específica. O ID da refeição deve ser fornecido na URL. Deve passar o nome de usuário e a senha criptografados em base64.
  ```
### Contribuições 🤝
Contribuições para o projeto são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.
### Licença 📝
Este projeto é licenciado sob a [MIT License](./LICENSE).
