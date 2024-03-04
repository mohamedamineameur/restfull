import { DataTypes } from "sequelize";
import { database } from '../connexion.js';

export const Panier = database.define('panier', {
  
    valider:{type:DataTypes.BOOLEAN, defaultValue:false}

});
