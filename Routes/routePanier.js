import { Router } from "express";
import { verifierToken, authorized } from "../Authentification/Autorisation.js";
import { addItem, getItmes, getItmesByUserId, getItemById, updateItemById, deletItemById } from "../Controlers/panier.js";

const routePanier = Router();

routePanier.post('/', verifierToken, authorized(0), addItem)
    .get('/', verifierToken, authorized(1), getItmes)
    .get('/user', verifierToken, authorized(0), getItmesByUserId)
    .get('/:id', verifierToken, authorized(0), getItemById)
    .put('/:id', verifierToken, authorized(0), updateItemById)
    .delete('/:id', verifierToken, authorized(0), deletItemById);

export default routePanier;
