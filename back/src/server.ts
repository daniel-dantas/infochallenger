import App from "./app";
import DotEnv from "dotenv";

DotEnv.config();

const myApp = new App({
  PORT: Number(process.env.PORT),
  PG_CONNECTION: `postgres://${process.env.PG_USER}:${process.env.PG_PASS}@localhost:${process.env.PG_PORT}/${process.env.PG_DBNAME}`,
});

myApp.listen();
