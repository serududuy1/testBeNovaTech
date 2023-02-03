

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


## API Reference

#### Get Root

```http
  GET /
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

