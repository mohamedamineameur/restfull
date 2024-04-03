const validerUtilisateur = (Utilisateur) => {
    const { nom, prenom, courriel, mot_de_passe } = Utilisateur;
    const nomRegex = /^[a-zA-ZÀ-ÿ- ']+$/;
    const mdpRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let estValide = true; // Résultat de la validation réussie
    let erreurs = {};     // Résultat de la validation échouée
  
    if (nom && !nomRegex.test(nom)) {
      erreurs['nom'] = "Le nom doit contenir seulement des caractères de l'alphabet";
      estValide = false;
    }
  
    if (prenom && !nomRegex.test(prenom)) {
      erreurs['prenom'] = "Le prénom doit contenir seulement des caractères de l'alphabet";
      estValide = false;
    }
  
    if (mot_de_passe && !mdpRegex.test(mot_de_passe)) {
      erreurs['mdp'] = "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre, un caractère spécial et au moins 8 caractères";
      estValide = false;
    }
  
    if (courriel && !regexEmail.test(courriel)) {
      erreurs['email'] = "L'email doit être comme ex: exemple@email.com";
      estValide = false;
    }
  
    if (estValide) return estValide;
    return erreurs;
  }
  
  export default validerUtilisateur;
  