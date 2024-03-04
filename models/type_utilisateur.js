import {  DataTypes } from "sequelize";
import {database} from '../connexion.js'

export const Type_Utilisateur=database.define('type_utilisateur',{
    nom:{type:DataTypes.STRING},
    niveau:{type:DataTypes.INTEGER}
    
})
