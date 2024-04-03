import { Router } from "express";
import { verifierToken, authorized } from "../Authentification/Autorisation.js";
import { addType_Utilisateur, getTypes, getTypeParId, updateTypeById } from "../Controlers/type_utilisateur.js"

const routeTypeUtilisateur = Router();

routeTypeUtilisateur.post('/', verifierToken, authorized(3), addType_Utilisateur)
    .get('/',/* verifierToken, authorized(3),*/ getTypes)
    .get('/getbyid/', verifierToken, authorized(3), getTypeParId)
    .put('/updatebyid/', verifierToken, authorized(3), updateTypeById);

export default routeTypeUtilisateur;
