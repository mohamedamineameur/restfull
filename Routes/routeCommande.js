import { Router } from "express";
import { verifierToken, authorized } from "../Authentification/Autorisation.js";

import { addCommande,getAllCommandesByUserId,getComandes,getOneCommandeById, updateCommandeById } from '../Controlers/commande.js';

const routeCommandes = Router();

routeCommandes.get('/',/*verifierToken,authorized(1),*/ getComandes)
    .post('/',verifierToken,authorized(0), addCommande)
    .get('/byid',verifierToken,authorized(0), getAllCommandesByUserId)
    .get('/:id',verifierToken,authorized(0), getOneCommandeById)
    .put('/',/*verifierToken,authorized(1),*/ updateCommandeById )
    
export default routeCommandes;