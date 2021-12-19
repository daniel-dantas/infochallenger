import express, { Express, json } from "express";
import cors from "cors";
import Router from "./routes";
import PgConnection from './connections/PgConnection';

interface IConfig {
    PORT?: number,
    PG_CONNECTION: string
}

class App {
    private main: Express;
    private readonly PORT: number;

    constructor({ PORT, PG_CONNECTION } : IConfig) {
        this.main = express();
        this.PORT = PORT || 8000;
        this.config();
        this.database(PG_CONNECTION);
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

    private database(PG_CONNECTION: string) {
        PgConnection.connect(PG_CONNECTION);
        PgConnection.verifyConnection();
    }

    public listen() {
        this.main.listen(this.PORT, () => {
            console.log(`Server is open in port ${this.PORT}`);
        });
    }
}

export default App;