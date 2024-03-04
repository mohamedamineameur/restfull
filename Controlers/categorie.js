import { Categorie } from "../models/index.js";
import { Produit } from '../models/index.js';

export const addCategorie=async(req,res)=>{

    console.log(req.body)
const {nom}=req.body

console.log(nom)
try{
    const old_categorie=await Categorie.findOne({where:{nom:nom}})
    if(!old_categorie){
        const new_categorie= await Categorie.create({nom})
        res.status(201).json(new_categorie);
    }
}catch (error) {
    res.status(500).json({ message: "Une erreur est survenue lors de la création de la categorie.", error: error.message });
  }

}

export const getCategories=async(req,res)=>{

    try{
        const categories=await Categorie.findAll({
            include:[Produit]
        })
        res.status(200).json(categories)
    }catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors du chargement des categories.", error: error.message });
      }
}


export const updateCategorieById=async(req,res)=>{
    const {id}=req.body

    console.log(req.body)
    
    try{
        const type= await Categorie.findByPk(id,{})
        if(!type){
            return res.status(404).json({ message: "Categorie non trouvée" });

        }
        for (const [key, value] of Object.entries(req.body)) {
            if (value != null) { 
                type[key] = value;
            }
        }
        await type.save()
        res.status(200).json(type)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}