import { Etat_Commande } from "../models/index.js";

const addEtat_commande=async(etat)=>{
const nom=etat
try{
    const old_etat=await Etat_Commande.findOne({where:{nom:nom}})
    if(!old_etat){
        const new_etat= await Etat_Commande.create({nom})
       
    }
}catch(error) {
   
}

}



export const Etats=()=>{
    const etats=["Panier","Cuisine","Livraison","Terminée"]
    etats.forEach(element => {
        addEtat_commande(element)
    });

}