import {  DataTypes } from "sequelize";
import {database} from '../connexion.js'

export const Commande=database.define('commande',{
    description: { type: DataTypes.STRING },
    total:{type:DataTypes.DECIMAL},
    
    
})