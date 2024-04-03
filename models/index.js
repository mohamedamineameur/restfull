import { Commande } from "./commande.js";
import { Etat_Commande } from "./etat_commande.js";
import { Panier } from "./panier.js";
import { Produit } from "./product.js";
import { Type_Utilisateur } from "./type_utilisateur.js";
import { Utilisateur } from "./utilisateur.js";
import { Categorie } from "./categorie.js";
import {PanierProduit} from './ProduitPanier.js'

// Définition des relations
Etat_Commande.hasMany(Commande, { as: 'etat_Commande' }) ;
Commande.belongsTo(Etat_Commande);
Utilisateur.hasMany(Commande);
Commande.belongsTo(Utilisateur);
Panier.belongsTo(Utilisateur);
Utilisateur.hasMany(Panier);
Type_Utilisateur.hasMany(Utilisateur);
Utilisateur.belongsTo(Type_Utilisateur);
Produit.belongsTo(Categorie)
Categorie.hasMany(Produit)
//Panier.belongsToMany(Produit, { through: PanierProduit, unique: false });
//Produit.belongsToMany(Panier, { through: PanierProduit, unique: false });

Commande.hasOne(Panier)
Panier.belongsTo(Commande)


// ProduitPanier.js ou un fichier d'index qui importe tous les modèles
Produit.hasMany(PanierProduit, { foreignKey: 'produitId' });
PanierProduit.belongsTo(Produit, { foreignKey: 'produitId', as: 'Produit' });

Panier.hasMany(PanierProduit, { foreignKey: 'panierId' });
PanierProduit.belongsTo(Panier, { foreignKey: 'panierId' });



// Exportation unique de tous les modèles
export { Commande, Etat_Commande, Panier, Produit, Type_Utilisateur, Utilisateur, PanierProduit, Categorie };
