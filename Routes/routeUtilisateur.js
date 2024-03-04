import { Router } from "express";
import { verifierToken, authorized } from "../Authentification/Autorisation.js";
import { addUtilisateur, getUtilisateurParId, getUtilisateurParCourriel, updateUtilisateur,getUtilisateurs,verificationMail,resendVerif } from "../Controlers/utilisateur.js"; 

const routeUtilisateur = Router();

routeUtilisateur.post('/', addUtilisateur)
    .get('/by', verifierToken, authorized(0), getUtilisateurParId)
    .get('/courriel', verifierToken, authorized(0), getUtilisateurParCourriel)
    .put('/:id', verifierToken, authorized(1), updateUtilisateur)
    .get('/',verifierToken, authorized(3),getUtilisateurs)
    .post('/verification/',verificationMail)
    .post('/ressend/:id',resendVerif)

export default routeUtilisateur;
