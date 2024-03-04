import { Utilisateur } from "../models/index.js"
import { Type_Utilisateur } from "../models/index.js"
import jwt from 'jsonwebtoken'

export const verifierToken = (req, res, next) => {
    //Recuperation du token
    const bearerToken = req.headers.authorization

    //Verification de la presence du token
    if (!bearerToken) return res.status(401).json({ message: "Il faut d'abord se connecter" })

    //Recuperer le token sans la partie Bearer
    const token = bearerToken.split(' ')[1]

    jwt.verify(token, process.env.CODE_SECRET, (err, payload) => {
        if (err) return res.status(401).json({ message: err.message })

        req.userId = payload.id

        next()
    })

}



export const authorized = (niveau) => {
    return async (req, res, next) => {
        const bearerToken = req.headers.authorization
        let id
    //Verification de la presence du token
    if (!bearerToken) return res.status(401).json({ message: "Il faut d'abord se connecter" })

    //Recuperer le token sans la partie Bearer
    const token = bearerToken.split(' ')[1]

    jwt.verify(token, process.env.CODE_SECRET, (err, payload) => {
        if (err) return res.status(401).json({ message: err.message })

        id = payload.id

       
    })

        try {
            const user = await Utilisateur.findByPk(id);
            if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

            const role = user.typeUtilisateurId;
            const Type = await Type_Utilisateur.findByPk(role);
            const Niveau = Type.niveau;

            console.log("le Niveau est : *****************"+Niveau)

            console.log('niveau demandé est: '+niveau)

            if (Niveau >= niveau) {
                next();
            } else {
                return res.status(403).json({ message: "Vous n'avez pas acces" });
            }
            
        } catch (error) {
            return res.status(403).json({ message: error.message });
        }
    };
}
