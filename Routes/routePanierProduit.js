import { Router } from "express";
import { verifierToken, authorized } from "../Authentification/Autorisation.js";

import {addPanierProduit,getPanierProduits,updatePanierProduitById,deletPanierProduitById} from '../Controlers/ProduitPanier.js'


const routePanierProduit = Router();

routePanierProduit.post('/', verifierToken, authorized(0), addPanierProduit)
    .get('/', verifierToken, authorized(0), getPanierProduits)
    .put('/:id', verifierToken, authorized(0), updatePanierProduitById)
    .delete('/:id', verifierToken, authorized(0), deletPanierProduitById);

export default routePanierProduit;