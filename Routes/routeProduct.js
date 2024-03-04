import { Router } from "express";
import { verifierToken, authorized } from "../Authentification/Autorisation.js";
import { addProduit, getAllProduits, getProduitById, updateProductById, deleteProductById, upload } from "../Controlers/product.js"; 

const routeProduits = Router();

routeProduits.post('/', /*verifierToken, authorized(2), */upload.single('photo'), addProduit)
    .get('/',  getAllProduits)
    .get('/:id', verifierToken, authorized(0), getProduitById)
    .put('/', verifierToken, authorized(2), upload.single('photo'), updateProductById)
    .delete('/', verifierToken, authorized(2), deleteProductById);

export default routeProduits;
