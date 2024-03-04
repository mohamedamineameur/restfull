import { Utilisateur } from '../models/index.js'

//Importer le module qui cree le jeton d'authentification (token)
import jwt from 'jsonwebtoken'

//Importer le module de hachage
import bcrypt from 'bcryptjs'

export const login = async (req, res) => {

    console.log('HELLO!!!!!!!!!!!!!!!!!!!!')
    //Recuperation du login et mot de passe de l'utilisateur

    const { courriel, mot_de_passe } = req.body

    console.log("l'adresse est : "+courriel)
    if (!courriel) return res.status(404).json({ message: "L'email est obligatoire!" })

    try {
        //Allons-y chercher l'utilisateur dans la base de donnee
        const user = await Utilisateur.findOne({ where: { courriel } })

        if (!user) return res.status(404).json({ message: "Cet utilisateur n'existe pas" })

        

        //Verification du mot de passe

        const mdpVerifie = bcrypt.compareSync(mot_de_passe, user.mot_de_passe)

        if (!mdpVerifie) return res.status(400).json({ message: "Mot de passe incorrect" })

        //Tout est correct, nous allons donner une clef (token) a l'utilisateur

        const payload = { id: user.id }

        const token = jwt.sign(payload, process.env.CODE_SECRET)

        res.status(200).json({ data: user, token })


        console.log( token)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}