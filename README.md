## Inicialização

Após realizar o clone do projeto, bastam 2 comandos 1 uma configuração para tê-lo rodando localmente. Os comandos são:

Para instalar os pacotes e as dependências necessárias
```
yarn
```


Antes de iniciar o servidor é necesário atribuir os valores desejados para as variaveis de ambiente em um arquivo `.env`. Para isso, basta copiar e colar o arquivo `.env.sample`, removendo o `.sample` e atribuindo os valores para cada variável.

Para iniciar o servidor localmente
```
yarn start
```

Por fim, é possível conferir a documentação da API abaixo no READ.ME e também disponibilizado no endereço `localhost:3000/doc` (quando o servidor estiver rodando).

## Endpoints

### Documentação

`/doc`
Documentação da API com os métodos existentes, parâmetros necessários e códigos e modelos de resposta.

### Autenticar Usuário

`POST /api/user/login`
Realiza a autenticação via JWT Web Token e retorna o token para ser utilizado nas próximas chamadas.

Parâmetros da Solicitação:
-  Informações do usuário para ser autenticado.
```json
{
  "email": "marcelo@email.com", // obrigatório
  "password": "senha123", // obrigatório
}
```

### Listar Usuários

`GET /api/user/`
Retorna uma lista de todos os usuários cadastrados no sistema.

### Inserir Usuário

`POST /api/user/`
Insere um novo usuário no sistema.

Parâmetros da Solicitação:
-  Informações do usuário a ser inserido.
```json
{
  "email": "marcelo@email.com", // obrigatório
  "name": "Marcelo", // obrigatório
  "password": "senha123", // obrigatório
}
```

### Obter Usuário por ID

`GET /api/user/{id}`
Retorna os detalhes de um usuário específico com base no ID fornecido.

Parâmetros da URL:
- `id` (string): O ID do usuário a ser obtido.

### Atualizar Usuário

`PUT /api/user/{id}`
Atualiza os detalhes de um usuário específico com base no ID fornecido.

Parâmetros da URL:
- `id` (string): O ID do usuário a ser atualizado.

Parâmetros da Solicitação:
- Informações do usuário a serem atualizadas.
```json
{
  "email": "marcelo@email.com",
  "name": "Marcelo",
  "password": "senha123",
}
```

### Excluir Usuário

`DELETE /api/user/{id}`
Exclui um usuário específico com base no ID fornecido.

Parâmetros da URL:
- `id` (string): O ID do usuário a ser excluído.


### Listar Protestos

`GET /api/protest/`
Retorna uma lista de todos os protestos cadastrados no sistema.

### Inserir Protesto

`POST /api/protest/`
Insere um novo protesto no sistema e gera um novo emolumento de acordo com a porcentagem do valor do protesto.

Parâmetros da Solicitação:
-  Informações do protesto a ser inserido.
```json
{
  "user_id": "1231241", // obrigatório
  "debt": 5000, // obrigatório
  "description": "descrição", // obrigatório
}
```

### Obter Protesto por ID

`GET /api/protest/{id}`
Retorna os detalhes de um protesto específico com base no ID fornecido.

Parâmetros da URL:
- `id` (string): O ID do protesto a ser obtido.

### Atualizar Protesto

`PUT /api/protest/{id}`
Atualiza os detalhes de um protesto específico com base no ID fornecido e do emolumento correspondente caso haja alterações no valor.

Parâmetros da URL:
- `id` (string): O ID do protesto a ser atualizado.

Parâmetros da Solicitação:
- Informações do protesto a serem atualizadas.
```json
{
  "user_id": "1231241",
  "debt": 5000,
  "description": "descrição",
}
```

### Excluir Protesto

`DELETE /api/protest/{id}`
Exclui um protesto específico com base no ID fornecido.

Parâmetros da URL:
- `id` (string): O ID do protesto a ser excluído.

### Listar Emolumentos

`GET /api/fee/`
Retorna uma lista de todos os emolumentos cadastrados no sistema.

### Inserir Emolumento

`POST /api/fee/`
Insere um novo emolumento no sistema.

Parâmetros da Solicitação:
-  Informações do emolumento a ser inserido.
```json
{
  "user_id": "1231241", // obrigatório
  "protest_id": "2312323",
  "protest_fee": 50,
}
```

### Obter Emolumento por ID

`GET /api/fee/{id}`
Retorna os detalhes de um emolumento específico com base no ID fornecido.

Parâmetros da URL:
- `id` (string): O ID do emolumento a ser obtido.

### Atualizar Emolumento

`PUT /api/fee/{id}`
Atualiza os detalhes de um emolumento específico com base no ID fornecido.

Parâmetros da URL:
- `id` (string): O ID do emolumento a ser atualizado.

Parâmetros da Solicitação:
- Informações do emolumento a serem atualizadas.
```json
{
  "user_id": "1231241",
  "protest_id": "2312323",
  "protest_fee": 50,
}
```

### Excluir Emolumento

`DELETE /api/fee/{id}`
Exclui um emolumento específico com base no ID fornecido.

Parâmetros da URL:
- `id` (string): O ID do emolumento a ser excluído.
