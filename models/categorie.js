import {  DataTypes } from "sequelize";
import {database} from '../connexion.js'

export const Categorie=database.define('Categorie',{
    nom:{type:DataTypes.STRING},
    affichage:{type:DataTypes.BOOLEAN, defaultValue:true}  
    
})
