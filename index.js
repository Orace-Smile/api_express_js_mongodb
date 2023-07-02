const express = require('express');
const mongoose = require('mongoose');

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://oracejuscard:jtqr9tTvxbhMDIpk@cluster0.4mro4fa.mongodb.net/healthy?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connecté à MongoDB');
}).catch(err => {
  console.error('Erreur de connexion à MongoDB', err);
  process.exit(1);
});

// Définition du schéma pour les données
const donneeSchema = new mongoose.Schema({
  donnee: String
});

// Création du modèle basé sur le schéma
const Donnee = mongoose.model('Donnee', donneeSchema);

// Configuration d'Express.js
const app = express();
app.use(express.json());

// Route pour recevoir les requêtes POST depuis la carte NodeMCU
app.post('/api/donnees', (req, res) => {
  const { donnee } = req.body;

  // Création d'une nouvelle instance du modèle avec la donnée reçue
  const nouvelleDonnee = new Donnee({ donnee });

  // Enregistrement de la donnée dans la base de données
  nouvelleDonnee.save()
    .then(() => {
      console.log('Donnée enregistrée avec succès');
      res.sendStatus(200);
    })
    .catch(err => {
      console.error('Erreur lors de l\'enregistrement de la donnée', err);
      res.sendStatus(500);
    });
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur API démarré sur le port 3000');
});
