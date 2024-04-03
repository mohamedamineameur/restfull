import { Router } from "express";
import { verifierToken, authorized } from "../Authentification/Autorisation.js";

import {addPanierProduit,getPanierProduits,updatePanierProduitById,deletPanierProduitById,viderLePanierById, deletAllPanierProduitById} from '../Controlers/ProduitPanier.js'


const routePanierProduit = Router();

routePanierProduit.post('/', verifierToken, authorized(0), addPanierProduit)
    .get('/', /*verifierToken, authorized(0),*/ getPanierProduits)
    .put('/put', verifierToken, authorized(0), updatePanierProduitById)
   .delete('/sup', verifierToken, authorized(0), deletPanierProduitById)
  .delete('/',viderLePanierById)
    .delete('/all',deletAllPanierProduitById)

export default routePanierProduit;