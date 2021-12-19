import { Sequelize } from "sequelize";

abstract class PgConnection {
  private static database: Sequelize;

  public static async connect(connectLink: string) {
    console.log("CONNECT LINK", connectLink);
    this.database = new Sequelize(connectLink);
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
