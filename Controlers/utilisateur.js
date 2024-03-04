import { Utilisateur } from "../models/index.js";
import bcrypt from 'bcryptjs'
import validerUtilisateur from "../Validation/ValidationUtilisateur.js";
import { mailer } from "./Mailer.js";
import jwt from 'jsonwebtoken'


export const addUtilisateur = async (req, res) => {

    console.log("HELLO??????????????????????6")
   let numVerif=""

for(let i=0;i<6;i++){
    const b=Math.floor(Math.random() * 10);
    numVerif=numVerif+b

}
    
    
    const { courriel, mot_de_passe, nom, prenom } = req.body;
    const verifier=false
    const errors=validerUtilisateur(req.body)
    if (errors !== true) {
        return res.status(400).json({ errors });  
    }
    
  
    try {
        const user = await Utilisateur.findOne({ where: { courriel: courriel } });


        if(!user){const mdpCrypte=bcrypt.hashSync(mot_de_passe,10)
        
        
        const new_utilisateur = await Utilisateur.create({  courriel, mot_de_passe:mdpCrypte, nom, prenom,numVerif,verifier  });
        
        const b = `http://localhost:5005/verification/befor?code=${numVerif}&courriel=${courriel}`

        mailer(courriel,'Verification de lemail',b)
        res.status(201).json(new_utilisateur);}else{
            res.status(201).json({ message: "mail déjà utilisé" });
;
        }
        
        console.log("yes!!!!!!!!!")
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    

};

export const getUtilisateurParId= async(req,res)=>{
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
            return res.status(404).json({message:'utilisateur non trouvé'})
        }
        return res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getUtilisateurParCourriel= async(req,res)=>{
    const {courriel}=req.body
    try{
        const user= await Utilisateur.findOne({where:{courriel:courriel}})
        if(!user){
            return res.status(404).json({message:'utilisateur non trouvé'})
        }
        return user
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateUtilisateur = async (req, res) => {
    const { id } = req.body;

    
    const errors = validerUtilisateur(req.body);
    if (errors !== true) {
        return res.status(400).json({ errors });
    }

    try {
        const user = await Utilisateur.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'utilisateur non trouvé' });
        }

        
        for (const [key, value] of Object.entries(req.body)) {
            if (value != null) {
                if (key === 'mot_de_passe') {
                    
                    const cryptedPassword = bcrypt.hashSync(value, 10);
                    user[key] = cryptedPassword;
                } else {
                  
                    user[key] = value;
                }
            }
        }

        await user.save();

        
        const userUpdated = user.get({ plain: true });
        delete userUpdated.mot_de_passe; // Assurez-vous d'utiliser la bonne clé pour le mot de passe.
        res.status(200).json(userUpdated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUtilisateurs=async(req,res)=>{

    try{
        const users= await Utilisateur.findAll()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const useradmin=async()=>{
   const courriel='admin@test.com'
   const mot_de_passe='amdin'
   const typeUtilisateurId=1

   
  
    try {
        const user=await Utilisateur.findOne({where:{courriel:courriel}})

        if(!user){
            const mdpCrypte=bcrypt.hashSync(mot_de_passe,10)
        
        
        const new_utilisateur = await Utilisateur.create({  courriel, mot_de_passe:mdpCrypte,typeUtilisateurId});
       
        }
        
        
       
    } catch (error) {
       
    }

}

export const verificationMail=async(req,res)=>{
    console.log("hello")
    const {courriel}=req.body
    const {num}=req.body
    console.log(req.body)
    try{
        const user=await Utilisateur.findOne({where:{courriel:courriel}})
        if(!user){
            console.log(" utilisateur introuvable")
        }else{
            if(user.numVerif===num){
                user.verifier=true
                await user.save()
                const userUpdated = user.get({ plain: true });
                delete userUpdated.mot_de_passe; // Assurez-vous d'utiliser la bonne clé pour le mot de passe.
                res.status(200).json(userUpdated);
                console.log("je suis la ")
            }else(console.log('non'))
        }
    }catch(erreur){
        console.log("y a eu erreur")
    }
}

export const resendVerif=async(req,res)=>{
    console.log('******************************************')
    const {id}=req.params
    try{
        const user=await Utilisateur.findByPk(id)
        const numVerif=rand()
        user.numVerif=numVerif
        await user.save()
        mailer(user.courriel,'Ressend',numVerif)
    }
    catch{

        console.log('non')
    }
}

const rand=()=>{
    let numVerif;
    numVerif=''

for(let i=0;i<6;i++){
    const b=Math.floor(Math.random() * 10);
    numVerif=numVerif+b

}
return numVerif
}