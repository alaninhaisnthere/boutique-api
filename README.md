## Boutique API

A Boutique API é uma API desenvolvida para gerenciar e fornecer acesso a imagens armazenadas em um bucket Amazon S3. Além disso, ela oferece recursos de gerenciamento de usuários usando um banco de dados base64 (MySQL).

---

**Funcionalidades Principais:**

1. **Listar Todas as Categorias:**
   - Endpoint: `/categories`
   - Descrição: Retorna todas as categorias disponíveis com base nas pastas no bucket S3.

2. **Listar Todas as Imagens:**
   - Endpoint: `/images`
   - Descrição: Retorna todas as imagens disponíveis no bucket S3.

3. **Obter URL Assinada para Imagem:**
   - Endpoint: `/:categoria/:imagem`
   - Descrição: Gera uma URL assinada para uma imagem específica em uma categoria.

4. **Listar Itens de uma Categoria Específica:**
   - Endpoint: `/:categoria`
   - Descrição: Retorna todas as imagens associadas a uma categoria específica.

5. **Gerenciamento de Usuários (Banco de Dados MySQL):**
  - **Cadastro de Usuário:**
     - Endpoint: `/users`
     - Descrição: Listagem de todos os usuários cadastrados no banco de dados (apenas usuários cadastrados no banco de dados podem realizar o login).
       
   - **Cadastro de Usuário:**
     - Endpoint: `/user/register`
     - Descrição: Permite que os usuários se cadastrem na aplicação.

   - **Login de Usuário:**
     - Endpoint: `/user/login`
     - Descrição: Realiza o login do usuário.

   - **Remoção de Usuário:**
     - Endpoint: `/user/delete`
     - Descrição: Remove o usuário autenticado da aplicação.

   - **Atualização de Dados do Usuário:**
     - Endpoint: `/user/update`
     - Descrição: Atualiza as informações do usuário autenticado.

---

**Stacks Utilizadas:**

- **Node.js**
- **Express.js**
- **AWS SDK**
- **MySQL**
- **JWT (JSON Web Tokens)**
- **dotenv**
- **Nodemon**

---

**Instruções de Configuração:**

1. Clone o repositório.
2. Execute `npm install` para instalar as dependências.
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Certifique-se de ter o Node.js e o MySQL instalados.
5. Execute `npm start` para iniciar o servidor.

---

**Endpoints Disponíveis:**

- `/` (GET)
- `/categories` (GET)
- `/images` (GET)
- `/:categoria/:imagem` (GET)
- `/:categoria` (GET)
- `/users` (GET)
- `/user/register` (POST)
- `/user/login` (POST)
- `/user/delete` (DELETE)
- `/user/update` (PUT)

---

**Observações:**

- As credenciais da AWS devem ser corretamente configuradas no arquivo `.env` para operações de admin no Amazon S3.
- O banco de dados MySQL deve estar configurado corretamente e as informações de conexão devem ser fornecidas no arquivo `.env`.

---

## :books: Documentação

- [Documentação da API](api_documentation.md)

---

**Contribuições:**

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests com dicas e sugestões para melhorar a API.

---

**Autoria:** Alana Oliveira
<p align="left">
  <a href="https://www.linkedin.com/in/alanaoliveira71" title="LinkedIn">
  <img src="https://img.shields.io/badge/-Linkedin-0e76a8?style=flat-square&logo=Linkedin&logoColor=white&link=/" alt="LinkedIn"/></a>