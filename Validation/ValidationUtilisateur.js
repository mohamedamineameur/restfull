const validerUtilisateur = Utilisateur => {
    const { nom,prenom, courriel, mot_de_passe} = Utilisateur
    const nomRegex = /^[a-zA-ZÀ-ÿ- ']+$/;

    const mdpRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/i
    const telephoneRegex=/^(\+?1\s*[-.\s]*)?(\(\d{3}\)|\d{3})[-.\s]*\d{3}[-.\s]*\d{4}$/
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const regexDate = /^\d{2}-\d{2}-\d{4}$/;
    let estValide = true  //Resultat de la validation reussie
    let erreurs = {}      //Resultat de la validation echouee
    if (!nomRegex.test(nom)) {
        erreurs['nom'] = "Le nom doit contenir seulement des caracteres de l'alphabet"
        estValide = false
    }

    if (!nomRegex.test(prenom)) {
        erreurs['prenom'] = "Le nom doit contenir seulement des caracteres de l'alphabet"
        estValide = false
    }

    if (!mdpRegex.test(mot_de_passe)) {
        erreurs['mdp'] = "Le mot de passe doit contenir Une Majuscule, une minuscule, chifre, character special et au moins 8 caracter"
        estValide = false
    }

    

    if (!regexEmail.test(courriel)) {
        erreurs['email'] = "email doit etre comme ex: exemple@email.com"
        estValide = false
    }

    
    if (estValide) return estValide
    return erreurs
}

export default  validerUtilisateur