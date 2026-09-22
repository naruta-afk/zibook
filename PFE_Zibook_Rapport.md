# Rapport professionnel de projet

## Projet : Zibook - Plateforme e-commerce de livres

### 1. Introduction
Le projet Zibook est une plateforme de commerce électronique dédiée à la vente de livres en ligne. L’objectif principal est de proposer une expérience d’achat fluide, moderne et sécurisée, en combinant un front-end réactif, un back-end robuste et une gestion fiable des commandes, des utilisateurs et des paiements.

La solution a été développée avec une architecture client-serveur moderne, intégrant React pour l’interface utilisateur, Node.js/Express pour l’API serveur et MongoDB comme base de données principale. L’architecture tient compte de l’expérience utilisateur, de la sécurité des données, ainsi que de la gestion des commandes et des paiements numériques.

### 2. Contexte et problématique
Le marché du numérique et du commerce en ligne continue de se développer, et la vente de livres en ligne représente un secteur à forte valeur ajoutée. Cependant, de nombreuses plateformes souffrent encore de plusieurs problèmes :

- interface peu ergonomique,
- faible intégration entre le catalogue et le panier,
- manque de sécurité dans les transactions,
- système de gestion de commande insuffisant,
- parcours d’achat peu optimisé pour les clients.

Zibook vise à répondre à ces défis en mettant en place un système complet de boutique en ligne, avec :

- catalogue de produits dynamique,
- panier utilisateur,
- authentification sécurisée,
- gestion des adresses de livraison,
- commandes COD et paiement Stripe,
- historique des commandes.

### 3. Objectifs du projet
Les objectifs du projet peuvent être classés en trois catégories :

#### 3.1 Objectifs fonctionnels
- permettre à l’utilisateur de parcourir les livres disponibles,
- ajouter des produits au panier et modifier les quantités,
- enregistrer des adresses de livraison,
- passer une commande par paiement à la livraison ou via Stripe,
- suivre l’historique de ses commandes.

#### 3.2 Objectifs techniques
- concevoir une architecture client-serveur évolutive,
- sécuriser les accès avec JWT et cookies,
- structurer le projet pour améliorer la maintenance,
- utiliser MongoDB pour la persistance des données,
- intégrer un système de paiement numérique fiable.

#### 3.3 Objectifs académiques
- démontrer la capacité à concevoir une application web complète,
- appliquer les principes du développement Full Stack,
- organiser le projet selon une logique professionnelle,
- présenter une solution réaliste et exploitable.

### 4. Analyse fonctionnelle
La plateforme propose deux grands types d’utilisateurs :

- Utilisateur client : consultation du catalogue, ajout au panier, authentification, placement de commandes, consultation des commandes.
- Administrateur : gestion des produits, suivi des commandes, mise à jour du statut des achats.

#### 4.1 Modules principaux
- Catalogue produits
- Panneau panier
- Authentification utilisateur
- Gestion des informations de livraison
- Gestion des commandes
- Paiements Stripe
- Espace admin

### 5. Architecture technologique
Le projet s’appuie sur une pile technologique moderne et adaptée à un environnement web e-commerce.

#### Front-end
- React
- Vite
- React Router
- Axios
- React Hot Toast
- React Icons

#### Back-end
- Node.js
- Express.js
- JWT
- Cookie-parser
- CORS

#### Base de données
- MongoDB
- Mongoose

#### Paiement
- Stripe

#### Stockage médias
- Cloudinary

### 6. Analyse de l’architecture du système
L’application suit une séparation logique claire entre le client et le serveur.

- Le client gère l’interface, la navigation et l’interaction utilisateur.
- Le serveur expose des API REST sécurisées pour gérer les données.
- La base MongoDB stocke les utilisateurs, les produits, les adresses et les commandes.
- Les images de produits sont envoyées vers Cloudinary pour un stockage fiable et scalable.

Cette structure permet une meilleure évolutivité et supporte les besoins d’un projet de commerce électronique.

### 7. Développement et fonctionnalités implémentées

#### 7.1 Catalogue des produits
Le catalogue affiche les livres disponibles avec leurs informations principales :
- nom,
- catégorie,
- description,
- prix,
- stock,
- image.

Le système de recherche et de filtrage par catégorie permet une meilleure navigation pour les clients.

#### 7.2 Panier
Le panier est localement géré côté client, avec possibilité de :
- ajouter des produits,
- augmenter ou diminuer les quantités,
- supprimer un article,
- calculer le sous-total,
- calculer les frais, la taxe et le montant total.

#### 7.3 Authentification
Les comptes utilisateur sont sécurisés à l’aide de JWT et de cookies. La session utilisateur est vérifiée avant l’accès aux routes protégées.

#### 7.4 Gestion des adresses
Les clients peuvent enregistrer une ou plusieurs adresses de livraison. Ces données sont ensuite utilisées pour finaliser une commande.

#### 7.5 Commandes
Le système prend en charge :
- commande à la livraison (Cash on Delivery),
- commande en ligne avec Stripe.

Les commandes enregistrent les détails de l’achat, l’utilisateur, le montant, l’adresse, la méthode de paiement et le statut actuel.

#### 7.6 Paiement Stripe
L’intégration Stripe permet :
- la création d’une session de paiement,
- le redirection vers le paiement sécurisé,
- la vérification du paiement après validation,
- la mise à jour du statut de la commande.

### 8. Sécurité
La sécurité a été prise en compte dans plusieurs couches :

- mot de passe hashé avec bcrypt,
- JWT pour la validation des sessions,
- cookies sécurisés,
- validation des entrées côté serveur,
- contrôle d’accès selon les rôles admin/utilisateur,
- validation des données de commande et des adresses.

### 9. Résultats obtenus
Le projet a permis la réalisation d’une plateforme e-commerce fonctionnelle avec les fonctionnalités essentielles attendues :

- navigation sur le catalogue,
- panier dynamique,
- achats sécurisés,
- gestion des commandes,
- API REST structurée,
- intégration Stripe,
- interface d’administration.

La solution est prête pour une mise en œuvre plus avancée, notamment avec des améliorations UX, des analyses de données et des campagnes marketing.

### 10. Limites et axes d’amélioration
Malgré les résultats satisfaisants, plusieurs améliorations restent possibles :

- ajout de paiement réel en production avec clés Stripe live,
- intégration d’un système de gestion de stock avancé,
- notifications email/SMS,
- recommandations personnalisées,
- moteur de recherche avancé,
- rapports d’analyse commerciale,
- mode de livraison multi-transporteur.

### 11. Conclusion
Le projet Zibook constitue une solution complète de boutique en ligne de livres, alliant design moderne, gestion efficace des données et intégration de paiement numérique. Il démontre la capacité à concevoir, développer et structurer une application Full Stack en respectant les bonnes pratiques du développement web.

Le projet répond bien aux objectifs initialement fixés : offrir une expérience d’achat intuitive, sécurisée et professionnelle pour les clients, tout en fournissant les outils nécessaires à la gestion des produits et des commandes côté administrateur.

### 12. Remerciements
Nous remercions nos encadrants, nos enseignants et les personnes qui ont contribué au bon déroulement de ce projet. Leur accompagnement a permis d’aboutir à une solution fonctionnelle et crédible.

---

Auteur : Projet de fin d’études
Projet : Zibook
Année : 2026
