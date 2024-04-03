import { Utilisateur, Type_Utilisateur } from '../models/index.js'

// Importer le module qui crée le jeton d'authentification (token)
import jwt from 'jsonwebtoken'

// Importer le module de hachage
import bcrypt from 'bcryptjs'

export const login = async (req, res) => {
    console.log('HELLO!!!!!!!!!!!!!!!!!!!!')
    // Récupération du login et mot de passe de l'utilisateur
    const { courriel, mot_de_passe } = req.body

    console.log("l'adresse est : "+courriel)
    if (!courriel) return res.status(404).json({ message: "L'email est obligatoire!" })

    try {
        // Allons-y chercher l'utilisateur dans la base de données
        const user = await Utilisateur.findOne({
            where: { courriel },
            include: [{ model: Type_Utilisateur}] // Assurez-vous que l'association est correctement définie dans vos modèles
        })

        if (!user) return res.status(404).json({ message: "Cet utilisateur n'existe pas" })

        // Vérification du mot de passe
        const mdpVerifie = bcrypt.compareSync(mot_de_passe, user.mot_de_passe)

        if (!mdpVerifie) return res.status(400).json({ message: "Mot de passe incorrect" })
        const payload = { id: user.id }
        const token = jwt.sign(payload, process.env.CODE_SECRET)

        // Création d'un nouvel objet utilisateur sans le mot de passe
        const { mot_de_passe: _, ...userData } = user.toJSON();
        if (user.verifier==true){

            // Tout est correct, nous allons donner une clef (token) à l'utilisateur
       

        res.status(200).json({ data: userData, token })

        console.log(token)
        }else{
            res.status(200).json({data:userData })
        }
        

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
