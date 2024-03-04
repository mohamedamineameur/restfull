import { DataTypes } from "sequelize";
import { database } from '../connexion.js';

export const PanierProduit = database.define('PanierProduit', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    panierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'paniers',
            key: 'id',
        }
    },
    produitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'produits',
            key: 'id',
        }
    }
});

