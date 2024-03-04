import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Pas besoin de .parsed ici, cela charge les variables d'environnement

export const database = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_FILE // Utilisez 'env' en minuscules
});
