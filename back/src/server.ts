import App from "./app";
import DotEnv from "dotenv";

DotEnv.config();

const myApp = new App({
  PORT: Number(process.env.PORT),
});

myApp.listen();
