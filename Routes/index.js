import { Router } from 'express';
import routeCommandes from './routeCommande.js'
import routePanier from './routePanier.js'
import routeProduits from './routeProduct.js'
import routeTypeUtilisateur from './routeType_Utilisateur.js'
import routeUtilisateur from './routeUtilisateur.js'
import routeLogin from './routeLogin.js';
import routePanierProduit from './routePanierProduit.js'
import routeCategorie from './routeCategorie.js'
import routeVerification from './routeVerification.js';

const routeurPrincipal = Router();

routeurPrincipal.use('/commande',routeCommandes)
routeurPrincipal.use('/panier',routePanier)
routeurPrincipal.use('/produit',routeProduits)
routeurPrincipal.use('/typeutilisateur',routeTypeUtilisateur)
routeurPrincipal.use('/utilisateur',routeUtilisateur)
routeurPrincipal.use('/login',routeLogin)
routeurPrincipal.use('/panier_produit',routePanierProduit)
routeurPrincipal.use('/categorie',routeCategorie)
routeurPrincipal.use('/verification', routeVerification)
export default routeurPrincipal
