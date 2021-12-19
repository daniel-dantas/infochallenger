import App from "./app";
import DotEnv from "dotenv";

DotEnv.config();

const myApp = new App({
  PORT: Number(process.env.PORT),
  PG_CONNECTION: {
      database: process.env.PG_DBNAME as string,
      host: process.env.PG_HOST as string,
      password: process.env.PG_PASS as string,
      username: process.env.PG_USER as string
  },
});

myApp.listen();
