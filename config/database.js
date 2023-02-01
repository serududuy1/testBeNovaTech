const {
  DB_USER = "root",
  DB_PASSWORD = "",
  DB_NAME = "lezvesfk",
  DB_HOST = "127.0.0.1",
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    dialect: "mysql",
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    dialect: "mysql",
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
