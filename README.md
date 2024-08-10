# Next Ecommerce

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![TypeScript](https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/next.js-%2301BDFC.svg?style=for-the-badge&logo=next.js&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-47848D?style=for-the-badge&logo=prisma&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Stripe](https://img.shields.io/badge/Stripe-000000?style=for-the-badge&logo=stripe&logoColor=white)



## Description

Créer un site e-commerce n'est pas une mince affaire. Il y a tellement de choses différentes qui entrent en jeu même pour un site e-commerce simple, allant depuis un tableau de bord administrateur jusqu'à la gestion des paiements et des comptes, et bien d'autres encore.

Ce projet vous guidera à travers chaque étape cruciale pour lancer votre première boutique e-commerce, conçue de zéro avec Next.js, Tailwind, Prisma et TypeScript.

## Source d'Inspiration

Ce projet a été grandement inspiré par la vidéo YouTube intitulée "[Full Stack Ecommerce Store With Admin Dashboard From Scratch - Next.js, Prisma, Stripe, Tailwind](https://www.youtube.com/watch?v=iqrgggs0Qk0)" publiée par [Web Dev Simplified](https://www.youtube.com/@WebDevSimplified).

## Table des Matières

- [Next Ecommerce](#next-ecommerce)
  - [Description](#description)
  - [Source d'Inspiration](#source-dinspiration)
  - [Table des Matières](#table-des-matières)
  - [Dépendances](#dépendances)
  - [Installation](#installation)
  - [Évolutions Réalisées](#évolutions-réalisées)
    - [Adoption de Biome pour remplacer ESLint et Prettier](#adoption-de-biome-pour-remplacer-eslint-et-prettier)
    - [Optimisation des requêtes Prisma](#optimisation-des-requêtes-prisma)

## Dépendances

Les dépendances suivantes sont requises pour le fonctionnement correct du projet.

- **@biomejs/biome**: Outil pour générer des modèles de code.
- **@prisma/client**: Client Prisma pour interagir avec la base de données.
- **@react-email/components**: Composants React pour créer des emails.
- **@radix-ui/react-dropdown-menu**, **@radix-ui/react-label**, **@radix-ui/react-slot**: Composants UI de Radix pour construire des interfaces utilisateur.
- **@stripe/react-stripe-js**, **@stripe/stripe-js**: Intégration de Stripe pour les paiements.
- **clsx**: Utilitaire pour construire des chaînes de classes conditionnelles.
- **husky**: Outil pour gérer les pré-commit et les hooks Git.
- **lucide-react**: Icones pour les applications web.
- **lint-staged**: Outil pour maintenir la qualité du code.
- **next**: Framework React pour la création de sites web.
- **postcss**: Postprocessor CSS.
- **prisma**: ORM pour la gestion de bases de données.
- **react**, **react-dom**: Bibliothèques React pour la construction d'interfaces utilisateur.
- **resend**: Package pour gérer les retours d'email.
- **stripe**: SDK officiel de Stripe pour Node.js.
- **tailwindcss**: Framework CSS pour le design rapide.
- **tailwind-merge**, **tailwindcss-animate**: Outils pour étendre TailwindCSS.
- **typescript**: Superset de JavaScript pour le développement robuste.
- **@types/node**, **@types/react**, **@types/react-dom**: Typescript definitions pour Node.js, React, et ReactDOM.

## Installation

Pour installer et exécuter ce projet localement:

1. Clonez le dépôt:
```bash
git clone https://github.com/Forthtilliath/next-ecommerce.git
```

2. Accédez au dossier du projet:
```bash
cd next-ecommerce
```

3. Installez les dépendances:
```bash
npm i
```

4. Compléter le fichier .env
```bash
# Pour se connecter à la section Admin
ADMIN_USERNAME=
# Mot de passe crypté
ADMIN_HASHED_PASSWORD=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=

# Api Key de resend
RESEND_API_KEY=
# Email affiché lors de l'envoi d'un mail
SENDER_EMAIL=
```

5. Démarrez le projet:
```bash
npm run dev
```

## Évolutions Réalisées

La réalisation du projet était déjà de haute qualité, entraînant un nombre minimal d'améliorations.

### Adoption de Biome pour remplacer ESLint et Prettier

L'outil Biome suscite actuellement beaucoup d'intérêt grâce à sa rapidité, sa performance accrue et son besoin réduit de packages. Convaincu par ces avantages, j'ai décidé de l'intégrer dans ce projet.

### Optimisation des requêtes Prisma

Afin de faciliter une future évolution de la base de données, toutes les requêtes Prisma ont été centralisées. Cette approche simplifie considérablement la gestion et accélère le processus d'adaptation face aux changements.