import {  DataTypes } from "sequelize";
import {database} from '../connexion.js'

export const Utilisateur=database.define('utilisateur',{
    nom:{type:DataTypes.STRING},
    prenom:{type:DataTypes.STRING},
    courriel:{type:DataTypes.STRING},
    mot_de_passe:{type:DataTypes.STRING},
    verifier:{type:DataTypes.BOOLEAN, defaultValue:false},
    numVerif:{type:DataTypes.STRING}

    
})
