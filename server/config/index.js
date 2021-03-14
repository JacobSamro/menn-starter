/* eslint-disable no-path-concat */
const db = require("mysql");
const knex = require("knex");

let sqlConfig = {};
const profile = process.env.NODE_ENV;

function resolve() {
  console.log(`Node enviroment ${profile}`);
  if (!profile) {
    return ".env";
  }
  switch (profile) {
    case "test":
      return ".env.test";
    case "dev":
      return ".env.dev";
    default:
      return ".env";
  }
}

const fileName = resolve();
console.log(`Resolve config filename ${fileName}`);
require("dotenv").load({ path: fileName });

const REQUIRED_KEYS = [
  "DB_HOST",
  "DB_USERNAME",
  "DB_PASSWORD",
  "DB_DATABASE",
];

REQUIRED_KEYS.forEach(key => {
  if (!(key in process.env)) {
    throw new Error(`Missing required config key: ${key}`);
  }
});

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_PORT = 3306,
  NODE_ENV,
} = process.env;

sqlConfig = {
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
  multipleStatements: true,
  dateStrings: "date",
  connectTimeout: 999999,
  connectionLimit: 9,
  canRetry: true,
  timezone: "+5:30"
};


const config = {
  config: sqlConfig,
  NODE_ENV,
  dbConnect: db.createConnection(sqlConfig),
  knex: knex({
    client: "mysql",
    debug: false,
    connection: sqlConfig,
    acquireConnectionTimeout: 4 * 1000
  }),
};

config.dbConnect.on("error", err => {
  if (
    err.code === "PROTOCOL_CONNECTION_LOST" ||
    err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"
  ) {
    console.log(`Re-connecting lost connection: ${err.stack}`);
    config.dbConnect = db.createConnection(sqlConfig);
  }

  console.log("SQL Error Occured");
});

config.dbConnect.on("connection", connection => {
  console.log("DB Connection Established");
});

module.exports = {
  [config.NODE_ENV || "development"]: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql"
  },
};

module.exports = config;
