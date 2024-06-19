import { Sequelize } from "sequelize";

const db = new Sequelize('konsultasi_chat', 'root', '', {
    host: "localhost",
    dialect: "mysql"
})

export default db;