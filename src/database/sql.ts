import { Sequelize } from "sequelize";
import config from "../config/index";

const sequelize = new Sequelize({
    dialect: "mysql",
    host: config.DB_HOST,
    port: Number(config.DB_PORT),
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME || "quickly_db",
    logging: false, // Disable logging; set to console.log to see SQL queries
    define: {
        timestamps: true, // Automatically add createdAt and updatedAt fields
        underscored: true, // Use snake_case for automatically added fields
    },
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        throw error;
    }
};

export default sequelize;