import { Sequelize } from "sequelize";

export interface PG_CONNECTION {
    database: string,
    username: string,
    password: string,
    host: string,
}

abstract class PgConnection {
  private static database: Sequelize;

  public static async connect({ database, host, password, username}: PG_CONNECTION) {
    this.database = new Sequelize(database, username, password, {
        host,
        dialect: "postgres"
    });
    this.database.sync();
  }

  public static getDatabase() {
    return this.database;
  }

  public static async verifyConnection() {
    try {
      await this.database.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

export default PgConnection;
