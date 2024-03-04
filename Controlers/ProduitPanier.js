import { Panier } from "../models/index.js";
import { Produit } from '../models/index.js';
import {PanierProduit} from '../models/index.js';


export const addPanierProduit = async(req,res)=>{
    const {panierId,produitId}=req.body
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


export const getPanierProduits= async (req,res)=>{
    const {PanierId}=req.body
    
    try{
        const items= await PanierProduit.findAll({where:{PanierId:PanierId}})
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}



export const updatePanierProduitById=async(req,res)=>{
    const {ProduitId}=req.body
    
    try{
        const item= await Panier.findOne({where:{ProduitId:ProduitId}})
        if(!item){
            return res.status(404).json({ message: "produit non trouvé" });

        }
        for (const [key, value] of Object.entries(req.body)) {
            if (value != null) { 
                item[key] = value;
            }
        }
        await item.save()

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const deletPanierProduitById=async(req,res)=>{
    const {ProduitId}=req.body
    
    try{
        const item= await Panier.findOne({where:{ProduitId:ProduitId}})
        if(!item){
            return res.status(404).json({ message: "produit non trouvé" });

        }
        
        await item.destroy()

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

