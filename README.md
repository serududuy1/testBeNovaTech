## Backend Express.js

## Installation

Install Library yang dibutuhkan sesuai package.json

```bash
  npm i
```

## Create Database

```bash
  npx sequelize db:create
```

## Migration Database

```bash
  npx sequelize db:migrate
```

## seeder Database / insert dummy

```bash
  npx sequelize db:seed:all
```

## Run Locally

Start the server

```bash
  npm start
```

############################################################################

# UNIT TESTING

## testing using jest

```bash
  npm test
```

############################################################################

# API Reference

## Get Root

```http
  GET http://localhost:8000/
```

############################################################################

## Login

```http
  POST http://localhost:8000/users/v1/login
```

##### Body raw

```bash
{
    "email": "aris@mail.com",
    "password":"123456"
}
```

############################################################################

## Get All Product

```http
  GET http://localhost:8000/product
```

##### Authorization : Bearer Token

```
Token: <token>
```

############################################################################

## Get All Kategori

```http
  GET http://localhost:8000/kategori
```

##### Authorization : Bearer Token

```
Token: <token>
```

############################################################################

### Get All Stock

```http
  GET http://localhost:8000/allstock
```

##### Authorization : Bearer Token

```
Token: <token>
```

############################################################################

### Get Sales per Month

```http
  GET http://localhost:8000/salesbymonth
```

##### Authorization : Bearer Token

```
Token: <token>
```

############################################################################

### Get All Sales

```http
  GET http://localhost:8000/allsales
```

##### Authorization : Bearer Token

```
Token: <token>
```

############################################################################

## Get Product By Kategori Id

```http
  POST http://localhost:8000/kategori/{id}
```

##### Authorization : Bearer Token

```
Token: <token>
```
