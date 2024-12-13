# Cahier des Charges - Pokémon Collection App

## Introduction

L'objectif de l'application est de permettre aux utilisateurs de gérer leur collection de cartes Pokémon de manière efficace et ludique. Les utilisateurs pourront ajouter, visualiser et classer leurs cartes, tout en suivant leur progression dans l'achèvement des différentes séries de cartes.

## Fonctionnalités Principales

1. **Page d'Accueil**
   - Présente un aperçu de la collection.
   - Affiche les pourcentages de complétion pour chaque série de cartes.
   - Lien vers la page de détails de la collection.

2. **Page de Détails de la Collection**
   - Liste l'ensemble des cartes de la collection.
   - Permet de trier et filtrer les cartes par série, rareté, etc.
   - Affiche la progression globale de la collection.
   - Bouton d'ajout rapide pour plusieurs cartes.

3. **Page d'Ajout de Cartes en Masse**
   - Permet d'ajouter rapidement plusieurs cartes à la collection.
   - Import CSV ou autre format de données.

4. **Barre de Recherche Globale**
   - Recherche rapide de cartes spécifiques.

5. **Authentification Utilisateur (Optionnel)**
   - Connexion et inscription des utilisateurs.
   - Sauvegarde de la collection liée à un compte.

6. **Page de Profil Utilisateur (Optionnel)**
   - Affiche les détails du profil utilisateur.
   - Historique des activités et réalisations.

## Structure de l'Application

```plaintext
src/
|-- assets/
|   |-- images/
|-- components/
|   |-- CardList.vue
|   |-- CollectionStats.vue
|   |-- SearchBar.vue
|-- views/
|   |-- Home.vue
|   |-- CollectionDetails.vue
|   |-- BulkAddCards.vue
|   |-- UserProfile.vue (Optionnel)
|-- services/
|   |-- firebase.ts
|   |-- cardService.ts
|-- App.vue
|-- main.ts
|-- router.ts
|-- firebase.ts
