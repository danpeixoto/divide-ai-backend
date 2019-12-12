# Divide-ai
Backend para o app Divide-ai
## Pré-requisitos
Para conseguir rodar os códigos typescript é necessario instalá-lo. Segue o link de instalação [typescript](http://www.typescriptlang.org/).

Também é necessário ter o nodejs instalado em sua máquina, ele possibilita a execução de codigo JS fora do navegadores. Segue o link de instalação [nodejs](https://nodejs.org/).
## Inicialização
**Após fazer download do projeto é necessário executar os seguintes comandos:**

O comando npm ira baixar todos as bibliotecas utilizadas no projeto que estão presentes no package.json.
```
npm
```

Para transforma o código .ts em .js é necessario utilizar o comando abaixo. O argumento '-w' serve para ele ficar ouvindo modificações no código e transpilar automaticamente. Esses arquivos serão criados dentro do diretório '/dist' que sera gerado quando o comando for executado.
```
tsc -w
```

Após a transpilação do código typescript é necessario inicialiar o servidor para que ele comece a escutar. Esse servidor foi definido para rodar na url http://localhost:3001.
```
nodemon /dist/main.js
```

**Agora o servidor deve estar rodando.**

## Acesso
**O acesso a API é feito através de requisições HTTP padrões, e elas são:**

### GET
**Retorna informações.**

URL:
```
http://localhost:3001/users
http://localhost:3001/users/:id
```
```
http://localhost:3001/tables
http://localhost:3001/tables/:id
```
```
http://localhost:3001/products
http://localhost:3001/products/:id
```
```
http://localhost:3001/items
http://localhost:3001/items/:id
```
```
http://localhost:3001/divided
http://localhost:3001/divided/:id
```
### POST
**Salva informações. Porém no usuario ele também faz autorização de login**
Em cada um deles é necessario passar as informações a serem salvas no corpo da requisição em json.
```
http://localhost:3001/users
http://localhost:3001/users/authenticate  /* corpo da requisição -> {"email":"EMAIL AQUI","password":"SENHA AQUI"}*/
```
```
http://localhost:3001/tables
```
```
http://localhost:3001/products
```
```
http://localhost:3001/items
```
```
http://localhost:3001/divided
```
### PUT
**Altera informações.**
Em cada um deles é necessario passar as informações a serem salvas no corpo da requisição em json.
```
http://localhost:3001/users/:id
http://localhost:3001/users/:id/:item_id  /*adiciona um item a um usuario, sem necessidade do corpo da requisição*/
```
```
http://localhost:3001/tables/:id
http://localhost:3001/tables/authenticate/:id /*corpo da requisição -> {"user_id":"ID AQUI",opcional->"password":"SENHA AQUI"}*/
```
```
http://localhost:3001/products/:id
```
```
http://localhost:3001/items/:id
```
```
http://localhost:3001/divided/:id
```
### DELETE
**Deleta documentos.**
```
http://localhost:3001/users/:id
```
```
http://localhost:3001/tables/:id
```
```
http://localhost:3001/products/:id
```
```
http://localhost:3001/items/:id
```
```
http://localhost:3001/divided/:id
```
