import { Type_Utilisateur } from "../models/index.js";


export const addType_Utilisateur=async(req,res)=>{
    console.log('********************************')
    console.log(req.body)
    const {nom,niveau}=req.body
    if(!typeof niveau==='number'){
        return res.status(400).json({ message:"Ce n'est pas un nombre entier" });
    }

    try {
        
       
        
        
        const new_type = await Type_Utilisateur.create({  nom,niveau  });
        res.status(201).json(new_type);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}

export const getTypes= async (req,res)=>{
    
    try{
        const types= await Type_Utilisateur.findAll()
        res.status(200).json(types);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}

export const getTypeParId= async(req,res)=>{

    const {id}=req.body

    try{
        const type= await Type_Utilisateur.findByPk(id)
        if(!type){
            return res.status(404).json({message:'type utilisateur non trouvé'})
        }
        return type
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateTypeById=async(req,res)=>{
    const {id}=req.body

    console.log("coucou")
    
    try{
        const type= await Type_Utilisateur.findByPk(id,{})
        if(!type){
            return res.status(404).json({ message: "type utilisateur non trouvé" });

        }
        for (const [key, value] of Object.entries(req.body)) {
            if (value != null) { 
                type[key] = value;
            }
        }
        await type.save()

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}


export const type=async()=>{


    const nom='admin'
    const niveau=3
    

    try {

        const type = await Type_Utilisateur.findOne({where:{nom:nom}})
        
       if(!type){
        
        
        const new_type = await Type_Utilisateur.create({  nom,niveau  });
       
    
    }
        
        
    } catch (error) {
        
    }

}