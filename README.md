# AGC Quiz Application

Application de quiz interactive pour les cours d'Artillerie de Campagne (AGC) - École Militaire de Tunisie.

## 🎯 Fonctionnalités

- ✅ 57 questions sur l'artillerie de campagne
- ✅ Système de sessions avec codes PIN
- ✅ Démarrage synchronisé pour tous les étudiants
- ✅ Timer de 60 secondes par question
- ✅ Auto-avancement après réponse
- ✅ Sauvegarde automatique de la progression
- ✅ Tableau de bord administrateur avec 5 speedometers semi-circulaires
- ✅ Classement en temps réel avec médailles
- ✅ Certificat pour le meilleur étudiant
- ✅ Export CSV des résultats
- ✅ Interface mobile-friendly

## 🚀 Déploiement sur Render.com

### Prérequis
- Compte GitHub (gratuit)
- Compte Render.com (gratuit)

### Étapes Rapides

1. **Créer un repository GitHub**
   - Uploadez tous les fichiers de ce dossier
   - Repository public

2. **Déployer sur Render.com**
   - New + → Web Service
   - Connectez votre repository GitHub
   - Configuration:
     - **Build Command**: `npm install`
     - **Start Command**: `node index.js`
     - **Instance Type**: Free

3. **Attendez 2-3 minutes**
   - Votre application sera disponible à: `https://votre-nom.onrender.com`

## 📖 Guide Complet

Consultez le fichier `RENDER_DEPLOYMENT_GUIDE_COMPLETE.md` pour un guide détaillé étape par étape.

## 🔑 Accès Administrateur

**URL**: `https://votre-url.onrender.com/admin`  
**Mot de passe**: `AGC2025`

## 👨‍🎓 Utilisation

### Pour l'Instructeur:
1. Accédez à `/admin`
2. Générez un code PIN
3. Partagez le code avec les étudiants
4. Attendez que tous rejoignent
5. Cliquez sur "Démarrer le Quiz pour Tous"
6. Suivez la progression en temps réel
7. Consultez les résultats et exportez en CSV

### Pour les Étudiants:
1. Accédez à l'URL principale
2. Entrez votre nom
3. Entrez le code PIN fourni par l'instructeur
4. Attendez le démarrage
5. Répondez aux 57 questions
6. Consultez vos résultats

## 🛠️ Technologies

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Stockage**: In-memory (session-based)

## 📝 Structure du Projet

```
agc-quiz-game/
├── client/               # Frontend React
│   ├── src/
│   │   ├── components/  # Composants réutilisables
│   │   ├── contexts/    # Context API (QuizContext)
│   │   ├── pages/       # Pages (Welcome, Quiz, Results, Admin)
│   │   ├── lib/         # Utilitaires (API)
│   │   └── types/       # Types TypeScript
│   └── public/          # Assets statiques
├── server/              # Backend Node.js
│   └── index.ts         # Serveur Express avec API
├── dist/                # Build de production
│   ├── public/          # Frontend compilé
│   └── index.js         # Backend compilé
└── package.json         # Dépendances

```

## 🔧 Développement Local

```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev

# Build pour production
npm run build

# Démarrer en production
NODE_ENV=production node dist/index.js
```

## 📊 API Endpoints

- `POST /api/session/generate-pin` - Générer un code PIN
- `POST /api/session/validate-pin` - Valider un code PIN
- `POST /api/session/join` - Rejoindre une session
- `POST /api/session/start` - Démarrer le quiz
- `GET /api/session/status` - État de la session
- `GET /api/session/participants` - Liste des participants
- `POST /api/session/progress` - Mettre à jour la progression
- `GET /api/session/progress` - Obtenir la progression
- `POST /api/session/reset` - Réinitialiser la session
- `POST /api/leaderboard/submit` - Soumettre un résultat
- `GET /api/leaderboard` - Obtenir le classement

## 👨‍💼 Auteur

Développé pour **Lt Col Oussama Atoui**  
École Militaire de Tunisie  
Cours d'Artillerie de Campagne (AGC)

## 📄 Licence

Usage interne - École Militaire de Tunisie

---

**Pour toute question ou assistance, consultez le guide de déploiement complet.**

