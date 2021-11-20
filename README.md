# Serverless API
----------------

### Proposta
Provisionar uma infraestrutura na AWS, em que se tenha uma lambda que sejá capaz de registrar em um banco de dados relacional ou não relacional, dados sobre funcionários de uma empresa.

#### Requisitos
1. Utilizar Clean Architecture

2. O funcionário deve possuir como atributos: Id, Idade, Nome e Cargo

3. Salvar as informações necessárias em um banco de dados relacional ou não relacional, dentro de uma infraestrutura AWS

4. Será necessário que a Lambda venha conseguir conseguir consultar, deletar e atualizar um funcionário, e que esteja acessível via internet.

5. Realizar testes unitários com [JEST](https://jestjs.io/).

-------------

### Solução

Para resolver o problema proposto, foi utilizado o framework chamado [serverless](https://www.serverless.com/). Este framework vem a permitir a criação de infraestrutura em CloudProviders através de arquivos de configuração.

Sua instalação pode ser feita através do comando

```javascript
npm install -g serverless
```

#### Execução
##### Configuração Inicial
O projeto levará em conta que **AWS-CLI** está configurada, utilizando um usuário que possui permissão de administrador. Caso não venha estar configurado, você pode acessar este [link](https://docs.aws.amazon.com/pt_br/cli/latest/userguide/install-cliv2.html), para realizar a instalação e para a criação do usuário neste [link](https://docs.aws.amazon.com/pt_br/cli/latest/userguide/cli-configure-quickstart.html).

##### Executando o Projeto
Inicialmente, para baixar as dependências do projeto, execute:

```javascript
npm install 
```

Para iniciar o deploy da aplicação, execute:
```javascript
npm run deploy
```
Ao executar este comando, o framework irá verificar o arquivo *serverless.yml* e irá configurar um bucket no AWS S3 com o template da infraestrutura desejada. Assim através do [AWS Cloud Formation](https://aws.amazon.com/pt/cloudformation/), irá realizar a instanciação e configuração dos serviços.

Neste arquivo, foi definido que será utilizado o serviço *AWS API Gateway* associando as *Lambdas functions* que serão executadas quando for realizado uma requisição REST para determinada rota. Além disso também vem a criar uma tabela no banco de dados DynamoDB para salvar as informações.

Ao finalizar a execução do deploy da infraestrutura, será exibido no terminal o link para os endpoints e métodos que a API vem oferecer, como no exemplo abaixo:

```javascript
Serverless: Stack update finished...
Service Information
service: serverless
stage: dev
region: us-east-2
stack: serverless-dev
resources: 30
api keys:
  None
endpoints:
  POST - https://e7av0vz39e.execute-api.us-east-2.amazonaws.com/dev/employee
  GET - https://e7av0vz39e.execute-api.us-east-2.amazonaws.com/dev/employee/{id}
  PUT - https://e7av0vz39e.execute-api.us-east-2.amazonaws.com/dev/employee/{id}
  DELETE - https://e7av0vz39e.execute-api.us-east-2.amazonaws.com/dev/employee/{id}
functions:
  create: serverless-dev-create
  list: serverless-dev-list
  update: serverless-dev-update
  delete: serverless-dev-delete
layers:
  None

```


#### API DOCS
------------------
#### Funcionário

| Propriedade | Significado                               |
|-------------|-------------------------------------------|
| id          | Número único identificador do Funcionário |
| nome        | Nome do funcionário                       |
| idade       | Idade do Funcionário                      |
| cargo       | Cargo ocupado pelo funcionário            |


##### Endpoints
----------------

##### GET /employee/{id}
Retorna o funcionário com a id informada

###### GET /employee/ad8ecede-ddc5-4f50-980a-2f55cb0bc42e
`HTTP/1.1 200 OK`
```json
{
  "id": "ad8ecede-ddc5-4f50-980a-2f55cb0bc42e",
  "nome": "João",
  "idade": "26",
  "cargo": "Mecânico"
}
```

##### POST /employee
Cria um novo funcionário
```json
{
  "nome": "João",
  "idade": "26",
  "cargo": "Mecânico"
}
```
`HTTP/1.1 200 Created`

```json
{
  "id": "ad8ecede-ddc5-4f50-980a-2f55cb0bc42e",
  "nome": "João",
  "idade": "26",
  "cargo": "Mecânico"
}
```

#### PUT /employee/{id}

Modifica um funcionário existente

##### PUT /employee/ad8ecede-ddc5-4f50-980a-2f55cb0bc42e

```json
{
  "nome": "João Silva",
  "idade": "26",
  "cargo": "Mecânico"
}
```
`HTTP/1.1 200 OK`

```json
{
  "id": "ad8ecede-ddc5-4f50-980a-2f55cb0bc42e",
  "nome": "João Silva",
  "idade": "26",
  "cargo": "Mecânico"
}
```

#### DELETE /employee/{id}

Remove um funcionário

##### DELETE /categories/ad8ecede-ddc5-4f50-980a-2f55cb0bc42e

`HTTP/1.1 200 OK`

```json
{}
```