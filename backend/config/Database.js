import { Sequelize } from "sequelize";

const db = new Sequelize('siabkar2', 'root', '', {
    host: "localhost",
    dialect: "mysql"
})

export default db;