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



export const Etats = async () => {
    const etats = ["En attente de preparation", "En cours de préparation", "En cours de livraison", "Livraison terminée"];
    let a = 0;
    console.log("****************************************************");
    for (let element of etats) {
        console.log(a);
        await addEtat_commande(element);
        a++;
    }
}
