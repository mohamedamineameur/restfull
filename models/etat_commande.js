import {  DataTypes } from "sequelize";
import {database} from '../connexion.js'

export const Etat_Commande=database.define('etat_commande',{
    nom:{type:DataTypes.STRING},
    
})