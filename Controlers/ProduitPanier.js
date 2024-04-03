import { Console } from 'console';
import { PanierProduit, Produit } from '../models/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Utilisez __dirname pour déterminer le chemin d'accès au répertoire actuel dans un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imgDir = path.join(__dirname, 'img');

export const getPanierProduits = async (req, res) => {
    const { panierId } = req.query;
    console.log("hello")
    try {
        const items = await PanierProduit.findAll({
            where: { panierId },
            include: [{
                model: Produit,
                as: 'Produit',
            }]
        });

        const itemsWithPhotos = await Promise.all(items.map(async item => {
            const produit = item.get({ plain: true }).Produit;
            if (produit && produit.chemin_image) {
                const cheminComplet = path.join(imgDir, produit.chemin_image);
                if (fs.existsSync(cheminComplet)) {
                    const imageAsBase64 = fs.readFileSync(cheminComplet, 'base64');
                    produit.photo = `data:image/${path.extname(produit.chemin_image).slice(1)};base64,${imageAsBase64}`;
                }
            }
            return {
                ...item.get({ plain: true }),
                Produit: produit
            };
        }));

        res.status(200).json(itemsWithPhotos);
    } catch (error) {
        console.error('Erreur lors de la récupération des produits du panier:', error);
        res.status(500).json({ error: error.message });
    }
};

export const addPanierProduit = async(req,res)=>{
    const {panierId,produitId}=req.body

    console.log(panierId)
console.log('888888888888888888888888888888888888888888888888888888888888888888888')
    try{
        const newProduitPanier=await PanierProduit.create({
            panierId,
            produitId
        })

        res.status(201).json(newProduitPanier); 
    } catch (error) {
        console.error('Erreur complète:', error);
        res.status(500).json({ error: error.message });
    }

}






export const updatePanierProduitById=async(req,res)=>{
    const {produitId}=req.body
    
    try{
        const item= await PanierProduit.findOne({where:{produitId:produitId}})
        if(!item){
            return res.status(404).json({ message: "produit non trouvé" });

        }
        for (const [key, value] of Object.entries(req.body)) {
            if (value != null) { 
                item[key] = value;
            }
        }
        await item.save()
        res.json({ message: "Produit mis à jour avec succès."});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const deletPanierProduitById=async(req,res)=>{
    const {produitId, panierId}=req.body
    console.log(req.body)
    try{
        const item= await PanierProduit.findOne({where:{produitId, panierId}})
        if(!item){
            return res.status(404).json({ message: "produit non trouvé" });

        }
        
        await item.destroy()

        res.json({ message: "Produit mis à jour avec succès."});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const deletAllPanierProduitById = async (req, res) => {
    const { produitId, panierId } = req.body;
    
    try {
        // La méthode `destroy` devrait supprimer toutes les entrées correspondantes sans limitation.
        const deletedCount = await PanierProduit.destroy({
            where: {
                produitId,
                panierId
            }
        });
    

        if (deletedCount === 0) {
            // Si aucun produit n'est supprimé, renvoyer une réponse 404.
            res.status(404).json({ message: "Aucun produit trouvé correspondant à ces critères." });
        } else {
            // Si des produits sont supprimés, renvoyer une réponse indiquant le succès.
            res.status(200).json({ message: `${deletedCount} produit(s) supprimé(s) avec succès.` });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression des produits du panier:', error);
        res.status(500).json({ error: error.message });
    }
};





export const viderLePanierById = async (req, res) => {
    const { panierId } = req.body;

    try {
        // Utilisez directement `destroy` avec le critère de recherche pour supprimer les lignes
        const resultat = await PanierProduit.destroy({
            where: { panierId: panierId }
        });

        // `resultat` contiendra le nombre de lignes supprimées
        if (resultat === 0) {
            return res.status(404).json({ message: "Aucun produit trouvé avec l'ID de panier spécifié." });
        }

        res.status(200).json({ message: "Panier vidé avec succès." });
    } catch (error) {
        console.error('Erreur lors de la tentative de vidage du panier:', error);
        res.status(500).json({ error: error.message });
    }
};


