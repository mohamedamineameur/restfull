import { Panier } from "../models/index.js";
import { Utilisateur } from "../models/index.js";
import jwt from 'jsonwebtoken'


export const addItem = async(req,res)=>{
    



    
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
       
        const user= await Utilisateur.findByPk(id)
        if(!user){
            res.status(404).json({message:'utilisateur non existant'})
        }
        

        const elementNonVerifieExiste = await Panier.findOne({
            where: { 
                utilisateurId: id,
                valider: false 
            }
        });
        
          
          // Retourne true si un élément non vérifié est trouvé, sinon false
          const resultat = !!elementNonVerifieExiste;
          
          console.log(resultat)
          if (!resultat){
            const new_panier = await Panier.create({utilisateurId:
                id
            });
            res.status(201).json(new_panier);
          }
          else{
            res.status(404).json({message:'il y a deja un panier non valider'})
          }

        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const getItmes= async (req,res)=>{
    
    try{
        const items= await Panier.findAll()
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}

export const getItmesByUserId= async (req,res)=>{
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
        const items= await Panier.findAll({where:{utilisateurId:id}})
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}

export const getItemById= async(req,res)=>{
    const {id}=req.body
    
    try{
        const item= await Panier.findByPk(id,{})
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const updateItemById=async(req,res)=>{
    const {id}=req.body
    
    try{
        const item= await Panier.findByPk(id,{})
        if(!item){
            return res.status(404).json({ message: "panier non trouvé" });

        }
        for (const [key, value] of Object.entries(req.body)) {
            if (value != null) { 
                item[key] = value;
            }
        }
        await item.save()
        res.status(200).json(item)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const deletItemById=async(req,res)=>{
    const {id}=req.body
    
    try{
        const item= await Panier.findByPk(id,{})
        if(!item){
            return res.status(404).json({ message: "admin non trouvé" });

        }
        
        await item.destroy()
        res.json({ message: "Produit mis à jour avec succès."});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}



/*export const getItems = async (req, res) => {
    try {
        const items = await Panier.findAll({
            include: [
                {
                    model: Utilisateur, // Inclure les données de l'utilisateur
                },
                {
                    model: PanierProduit, // Inclure les produits du panier
                    include: [Produit]    // Inclure les détails des produits
                }
            ]
        });

        // Convertir les produits en tableau (si nécessaire)
        const itemsFormatted = items.map(panier => {
            return {
                ...panier.toJSON(),
                produits: panier.PanierProduits.map(pp => pp.Produit)
            };
        });

        res.status(200).json(itemsFormatted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
*/
