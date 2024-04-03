import { Categorie, Produit } from "../models/index.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imgDir = path.join(__dirname, 'img');

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

export const getCategories = async (req, res) => {
    try {
        const categories = await Categorie.findAll({
            include: [{
                model: Produit,
                as: 'produits'
            }]
        });

        const categoriesWithPhotos = await Promise.all(categories.map(async categorie => {
            const produitsWithPhotos = await Promise.all(categorie.produits.map(async produit => {
                if (produit.chemin_image) {
                    const cheminComplet = path.join(imgDir, produit.chemin_image);
                    if (fs.existsSync(cheminComplet)) {
                        const imageAsBase64 = fs.readFileSync(cheminComplet, 'base64');
                        return {
                            ...produit.get({ plain: true }),
                            photo: `data:image/${path.extname(produit.chemin_image).slice(1)};base64,${imageAsBase64}`
                        };
                    }
                }
                return produit.get({ plain: true });
            }));

            return {
                ...categorie.get({ plain: true }),
                produits: produitsWithPhotos
            };
        }));

        res.status(200).json(categoriesWithPhotos);
    } catch (error) {
        console.error('Erreur lors du chargement des categories:', error);
        res.status(500).json({ message: "Une erreur est survenue lors du chargement des categories.", error: error.message });
    }
};


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