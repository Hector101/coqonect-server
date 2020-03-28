const dotenv = require('dotenv');

const isDevEnv = (() => process.env.NODE_ENV === 'development')();

const getEnvVariables = {
   host: isDevEnv ? process.env.DB_HOST_DEV : process.env.PROD_HOST_PROD,
   username: isDevEnv ? process.env.DB_USERNAME_DEV : process.env.DB_USERNAME_PROD,
   password: isDevEnv ? process.env.DB_PASSWORD_DEV : process.env.DB_PASSWORD_PROD,
   databasename: isDevEnv ? process.env.DB_DATABASE_DEV : process.env.DB_DATABASE_PROD,
   logging: isDevEnv ? true : false,
   synchronize: isDevEnv ? true : false,
};

const entities = isDevEnv ? "src/db/entity/**/*.ts" : "build/db/entity/**/*.js";
const migrations = isDevEnv ? "src/db/migration/**/*.ts" : "build/db/migration/**/*.js";
const subscribers = isDevEnv ? "src/db/subscribers/**/*.ts" : "build/db/subscribers/**/*.js";

const entitiesDir = isDevEnv ? "src/db/entity" : "build/db/entity";
const migrationsDir = isDevEnv ? "src/db/migration" : "build/db/migration";
const subscribersDir = isDevEnv ? "src/db/subscriber" : "build/db/subscriber";

module.exports = {
   type: "postgres",
   host: getEnvVariables.host,
   port: 5432,
   username: getEnvVariables.username,
   password: getEnvVariables.password,
   database: getEnvVariables.databasename,
   synchronize: getEnvVariables.synchronize,
   logging: getEnvVariables.logging,
   entities: [entities],
   migrations: [migrations],
   subscribers: [subscribers],
   cli: {
      entitiesDir,
      migrationsDir,
      subscribersDir,
   },
}
