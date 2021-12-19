import { Sequelize } from 'sequelize';
import DotEnv from 'dotenv';

DotEnv.config();

const { 
    PG_HOST,
    PG_DBNAME, 
    PG_USER, 
    PG_PASS 
} = process.env as any;

const sequelize = new Sequelize(PG_DBNAME, PG_USER, PG_PASS, {
    host: PG_HOST,
    dialect: 'postgres'
});

sequelize.sync();

export default sequelize;
