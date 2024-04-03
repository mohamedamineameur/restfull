import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import {database} from "./connexion.js"
import dotenv from 'dotenv'


import routeurPrincipal from './Routes/index.js'
import { Etats } from './Controlers/etat_commande.js'


import { useradmin } from './Controlers/utilisateur.js'
import { type, type2 } from './Controlers/type_utilisateur.js'
import { mailer } from './Controlers/Mailer.js'
import { addPanierProduit } from './Controlers/ProduitPanier.js'
import { addCategorie } from './Controlers/categorie.js'
import path from 'path';
import { fileURLToPath } from 'url'
database.sync()
  .then(() => {
    return type(); // Assurez-vous que `type` retourne une promesse.
  }).then(() => {
    return type2(); // Assurez-vous que `type` retourne une promesse.
  })
  .then(() => {
    useradmin(); // Appelle `useradmin` après le succès des promesses précédentes.
  }).then(() => {
    
    return Etats(); // Assurez-vous que `Etats` retourne une promesse.
  })
  .catch((error) => {
    console.error("Une erreur est survenue :", error);
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);


const PORT = process.env.PORT || 10000;
const app = express()
app.use(helmet())
app.use(compression())
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.get('/salutation',(req,res)=>{
    res.send('Bonjour tout le monde')
})
app.use(routeurPrincipal)
/*app.get('/page/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Page', 'index.html'));
});*/
app.post('/xy', addPanierProduit)
app.post('/az',addCategorie)
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
   
   
  });
  
