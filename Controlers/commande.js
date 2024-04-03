import { Panier } from "../models/index.js";
import { Utilisateur } from "../models/index.js";
import { Commande } from "../models/index.js";
import { Produit} from "../models/index.js";
import { PanierProduit } from "../models/index.js";
import jwt from 'jsonwebtoken'
import { Etat_Commande } from "../models/index.js";
import {mailer} from './Mailer.js'

export const addCommande = async(req,res)=>{
    
    const { panierId} = req.body.data;

    console.log(req.body)




    
    try {const etatCommandeIds=1
        
        
        
        const panier=await Panier.findByPk(panierId)

        const utilisateurId=panier.utilisateurId
        const user= await Utilisateur.findByPk(utilisateurId)
        if(!user){
            res.status(404).json({message:'utilisateur non existant'})
        }
       
        // Trouver tous les ProduitPanier pour le PanierId donné
        const produitsPanier = await PanierProduit.findAll({
            where: { panierId },
            include: [{
              model: Produit,
              as: 'Produit', // Assurez-vous que cette association est définie dans vos modèles
            }]
          });
          const quantite=0
          // Regrouper les produits par ProduitId et compter les occurrences pour obtenir la quantité
          const produitsQuantites = produitsPanier.reduce((acc, item) => {
            // Assurez-vous d'utiliser la bonne casse pour `produitId`
            if (!acc[item.produitId]) {
              acc[item.produitId] = {
                produit: item.Produit, // Le 'Produit' ici suppose que vous avez un alias avec cette casse
                quantite: 0
              };
            }
            acc[item.produitId].quantite++; // Utilisez `produitId` ici, pas `ProduitId`
            return acc;
          }, {});
          
          // Calculer le total et construire la description
          let total = 0;
          let description = '';
          let quantiteGlobale = 0;
      
          for (const id in produitsQuantites) {
            
            const { produit, quantite } = produitsQuantites[id];
            const prixTotal = quantite * produit.prix;
            total += prixTotal;
            quantiteGlobale += quantite;
      
            description += `Produit: ${produit.nom}, Quantité: ${quantite}, Total: ${prixTotal}$ \n`;
          }
          
          description += `Quantité globale: ${quantiteGlobale}, Total global: ${total}$`;
      
          
        // Créer la commande avec le total et la description
        const commande = await Commande.create({
          panierId,
          total,
          description,
          utilisateurId,
          etatCommandeId:etatCommandeIds
        });

        panier.valider=true
        await panier.save()
    
        res.status(201).json(commande);
      } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de la création de la commande.", error: error.message });
      }





    /*
    
    const {idPanier, utilisateurId}=req.body
    console.log("Requête reçue:", req.body);
    const etatCommandeIds=2
    
    try{
        const user= await Utilisateur.findByPk(utilisateurId)
        if(!user){
            res.status(404).json({message:'utilisateur non existant'})
        }
        const panier=await Panier.findByPk(idPanier)
     
        console.log(panier.total)
        const new_commande = await Commande.create({
           
            quantite: 
            total:
            utilisateurId,
            etatCommandeId:etatCommandeIds

        });

       panier.valider=true
        await panier.save()
        res.status(201).json(new_commande);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
*/
}

export const getComandes = async (req, res) => {

    
    try {
        const commandes = await Commande.findAll({
            include: [{
                model: Etat_Commande
            }]
        });
        res.status(200).json(commandes);
        console.log('hi')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getOneCommandeById=async(req,res)=>{
    const {id}=req.body
    
    try{
        const commande= await Commande.findByPk(id,{})
        res.status(200).json(commande);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const getAllCommandesByUserId=async (req,res)=>{
    const bearerToken = req.headers.authorization

    console.log(bearerToken)
    if (!bearerToken) return res.status(401).json({ message: "Il faut d'abord se connecter" })
    const token = bearerToken.split(' ')[1]

    let id;

    jwt.verify(token, process.env.CODE_SECRET, (err, payload) => {
        if (err) return res.status(401).json({ message: err.message })

        id = payload.id

        
    })
    try{
        const commandes= await Commande.findAll({where:{utilisateurId:id},
            include: [{
                model: Etat_Commande
            }]
        })
        res.status(200).json(commandes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}


export const updateCommandeById=async(req,res)=>{

   

    

    const {id}=req.body
    
    
    try{
        const commande= await Commande.findByPk(id,{})
        if(!commande){
            return res.status(404).json({ message: "commande non trouvé" });

        }
        for (const [key, value] of Object.entries(req.body)) {
            if (value != null) { 
                commande[key] = value;
            }
        }
        await commande.save()
        res.status(200).json("commandes");
        console.log(commande.etatCommandeId)
        const user = await Utilisateur.findByPk(commande.utilisateurId)
        const mail = user.courriel
        const message = `Votre commande #${id} a bien été livrée à votre adresse`
        const sujet = 'Livraison terminée'
        if(commande.etatCommandeId===4){
            mailer(mail, sujet, message)

        }
        

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

