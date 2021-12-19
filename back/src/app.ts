import express, { Express, json } from "express";
import cors from "cors";
import Router from "./routes";

interface IConfig {
    PORT?: number,
}

class App {
    private main: Express;
    private readonly PORT: number;

    constructor({ PORT } : IConfig) {
        this.main = express();
        this.PORT = PORT || 8000;
        this.config();
        this.routes();
    }

    public routes () {
        this.main.get("/api/v1", (req, res) => {
            return res.status(200).json({
                author: "Daniel Dantas Catarina",
            });
        });
        this.main.use("/api/v1", Router);
    }

    private config() {
        this.main.use(cors());
        this.main.use(json());
    }

    public listen() {
        this.main.listen(this.PORT, () => {
            console.log(`Server is open in port ${this.PORT}`);
        });
    }

    public getServer() {
        return this.main;
    }
}

export default App;