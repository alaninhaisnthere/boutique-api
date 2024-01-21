# Descrição

Esta é uma API para obter informações sobre produtos da Dil Boutique.

- Imagens de produtos
- Categorias de produtos
- Gerenciamento de usuários

## Base URL

A URL base para todas as solicitações da API é:

### [`http://localhost:3001/api/`](http://localhost:3001/api/)

## Endpoints

### `GET /api/images`

Retorna uma lista de todas as imagens disponíveis na Dil Boutique.

### `GET /api/images/categories`

Retorna uma lista de todas as categorias disponíveis na Dil Boutique.

### `GET /api/images/:categoria`

Retorna uma lista de todos os itens relacionados a uma categoria específica.

### `GET /api/images/:categoria/:imagem`

Retorna a URL assinada para visualizar uma imagem específica de uma categoria.

### `GET /api/users`

Retorna uma lista de todos os usuários registrados.

### `POST /api/users/register`

Registra um novo usuário na Dil Boutique.

#### Parâmetros

- `username`: Nome de usuário do novo usuário.
- `email`: Endereço de e-mail do novo usuário.
- `password`: Senha do novo usuário.

### `PUT /api/users/edit/:userId`

Edita as informações de um usuário existente.

#### Parâmetros

- `username`: Novo nome de usuário.
- `email`: Novo endereço de e-mail.
- `password`: Nova senha.

### `POST /api/users/login`

Realiza o login de um usuário na Boutique.

#### Parâmetros

- `identifier`: Nome de usuário ou e-mail do usuário.
- `password`: Senha do usuário.

### `GET /api/`

Retorna informações da página inicial da Boutique.

## Erros

Esta API utiliza os seguintes códigos de erro:

- `400 Bad Request`: A solicitação estava mal-formada ou faltando parâmetros necessários.
- `401 Unauthorized`: A chave da API fornecida era inválida ou ausente.
- `404 Not Found`: O recurso solicitado não foi encontrado.
- `500 Internal Server Error`: Um erro inesperado ocorreu no servidor.
