import { Router } from "express";
import { verifierToken, authorized } from "../Authentification/Autorisation.js";

import {addCategorie,updateCategorieById,getCategories}from '../Controlers/categorie.js'

const routeCategorie = Router();

routeCategorie.post('/', verifierToken, authorized(0), addCategorie)
    .get('/',/*verifierToken, authorized(0),*/ getCategories)
    .put('/', verifierToken, authorized(0), updateCategorieById)
    
export default routeCategorie;