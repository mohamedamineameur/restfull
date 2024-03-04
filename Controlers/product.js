import { Produit } from '../models/index.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Categorie } from '../models/index.js';

// Configuration initiale du chemin et vérification du dossier d'image
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imgDir = path.join(__dirname, 'img');
fs.existsSync(imgDir) || fs.mkdirSync(imgDir);

// Configuration de Multer pour valider et limiter les images
const imageFileTypes = /jpeg|jpg|png|gif/;
let imageCounter = 0; // Compteur pour nommer les images séquentiellement

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imgDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + (++imageCounter) + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});

const fileFilter = (req, file, cb) => {
  if (imageFileTypes.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non supporté'), false);
  }
};

export const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // Limite de taille de fichier à 20 Mo
});

export const addProduit = async (req, res) => {
  try {
    const { nom, prix, CategorieId } = req.body;
    console.log(req.body)
    const photo = req.file;

    if (!photo) {
      return res.status(400).send('Aucune photo fournie.');
    }

    const cheminPhoto = path.join(photo.filename);

    const nouvelArticle = await Produit.create({
      nom,
      prix,
      chemin_image: cheminPhoto,
      CategorieId
    });

    res.status(201).json(nouvelArticle);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'article:', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'article', error: error.message });
  }
};

export const getAllProduits = async (req, res) => {
  try {
    const produits = await Produit.findAll({
      include:[Categorie]
    });

    const produitsWithPhotos = await Promise.all(produits.map(async produit => {
      if (produit.chemin_image) {
        const cheminComplet = path.join(imgDir, produit.chemin_image);
        const imageAsBase64 = fs.readFileSync(cheminComplet, 'base64'); // encode l'image en base64
        return {
          ...produit.get({ plain: true }),
          photo: `data:image/${path.extname(produit.chemin_image).slice(1)};base64,${imageAsBase64}`
        };
      } else {
        return produit.get({ plain: true });
      }
    }));

    res.status(200).json(produitsWithPhotos);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des produits', error: error.message });
  }
};

export const getProduitById = async (req, res) => {
  const { id } = req.params;
  try {
    const produit = await Produit.findByPk(id);

    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    if (produit.chemin_image) {
      const cheminComplet = path.join(imgDir, produit.chemin_image);
      if (fs.existsSync(cheminComplet)) {
        const imageAsBase64 = fs.readFileSync(cheminComplet, 'base64');
        const produitWithPhoto = {
          ...produit.get({ plain: true }),
          photo: `data:image/${path.extname(produit.chemin_image).slice(1)};base64,${imageAsBase64}`
        };
        res.status(200).json(produitWithPhoto);
      } else {
        return res.status(404).json({ message: 'Image non trouvée' });
      }
   

      } else {
        res.status(200).json(produit); // Retourne le produit sans image si chemin_image est null
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du produit:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération du produit', error: error.message });
    }
  };


  export const updateProductById = async (req, res) => {
    const { id } = req.body;

    console.log(req.body);
    console.log('le id est : ' + id);
    console.log(req.file);
    try {
        const produit = await Produit.findByPk(id);
        if (!produit) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        
        // Mise à jour des champs à partir de req.body, sauf 'photo'
        for (const [key, value] of Object.entries(req.body)) {
            if (value != null) {
                produit[key] = value;
            }
        }

        // Ajoute la nouvelle photo sans supprimer l'ancienne
        if (req.file) {
            const photo = req.file;
            
            // Met à jour le chemin de la nouvelle photo dans l'objet produit sans supprimer l'ancienne photo
            // Enregistre uniquement le nom du fichier sans ajouter de préfixe de chemin
            produit.chemin_image = photo.filename;
        }

        await produit.save();
        const produitUpdated = await Produit.findByPk(id, {
            include: [Categorie]
        });

        res.status(200).json({ message: 'Produit mis à jour', produit: produitUpdated });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du produit:', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du produit', error: error.message });
    }
};




  export const deleteProductById = async (req, res) => {
    const { id } = req.params; // Utiliser req.params si l'ID est passé via l'URL

    try {
        const produit = await Produit.findByPk(id);
        if (!produit) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        // Supprimer l'image associée au produit du système de fichiers
        if (produit.chemin_image) {
            const cheminImage = path.join(imgDir, produit.chemin_image);
            if (fs.existsSync(cheminImage)) {
                fs.unlinkSync(cheminImage);
            }
        }

        // Supprimer le produit de la base de données
        await produit.destroy();
        res.status(200).json({ message: "Produit supprimé avec succès" });

    } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error);
        res.status(500).json({ message: "Erreur lors de la suppression du produit", error: error.message });
    }
};
