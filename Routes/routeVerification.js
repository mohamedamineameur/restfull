import { Router } from "express";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { verificationMail } from "../Controlers/utilisateur.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routeVerification = Router();

// Configuration pour servir des fichiers statiques du dossier 'Intermediare'
// Assurez-vous que ce dossier contient à la fois votre index.html et script.js
routeVerification.use(express.static(path.join(__dirname, '../Intermediare')));

// Route pour la vérification POST
routeVerification.post('/', verificationMail);

// Route GET pour servir index.html spécifiquement (si nécessaire)
routeVerification.get('/befor', (req, res) => {
  res.sendFile(path.join(__dirname, '../Intermediare', 'index.html'));
});

// Optionnellement, une autre route GET si vous avez une page HTML spécifique à servir
routeVerification.get('/autreRoute', (req, res) => {
  res.sendFile(path.join(__dirname, '../Page', 'index.html'));
});

export default routeVerification;
