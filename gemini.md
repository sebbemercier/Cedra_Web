# Documentation du Projet Cedra Web

## Présentation
Cedra Web est une plateforme e-commerce B2B de pointe spécialisée dans le matériel électrique professionnel. Elle intègre des fonctionnalités avancées d'intelligence artificielle pour l'approvisionnement, la prédiction de la demande et l'assistance client (Copilot).

## Stack Technique
### Frontend
- **Framework :** Next.js 16.1.2 (App Router)
- **Langage :** TypeScript
- **Bibliothèque UI :** React 19
- **Styling :** 
  - Tailwind CSS 4
  - Radix UI (composants primitifs)
  - DaisyUI, HeroUI, Mantine, Chakra UI, Ant Design (utilisés pour divers composants spécifiques)
  - Framer Motion (animations)
- **Gestion de formulaires :** React Hook Form + Zod (validation)
- **Icônes :** Lucide React, React Icons
- **Cartographie :** MapLibre GL

### Backend & API (via swagger.json)
- **Infrastructure :** ScyllaDB (base de données NoSQL scalable), Elasticsearch (moteur de recherche)
- **IA :** Intégration d'IA pour le tableau de bord, la prédiction de demande et le Copilot B2B.
- **Authentification :** JWT, OAuth2 (Google, Facebook, Apple), 2FA (TOTP & Email).

## Architecture des Fichiers
```text
/src
├── app/[locale]          # Routage principal avec support i18n (FR, EN, NL)
│   ├── admin/            # Gestion des stocks et articles (IA assistée)
│   ├── dashboard/        # Tableau de bord utilisateur B2B
│   ├── products/         # Catalogue et fiches produits
│   ├── cart/             # Gestion du panier
│   ├── orders/           # Historique des commandes et factures
│   └── quotes/           # Demandes de devis B2B complexes
├── components/
│   ├── home/             # Composants de la page d'accueil (Hero, Carousels)
│   ├── layout/           # Navbar, Footer
│   ├── products/         # Cartes produits, filtres
│   └── ui/               # Bibliothèque de composants réutilisables
├── hooks/                # Hooks personnalisés (ex: useCart)
├── lib/
│   ├── api.ts            # Client API
│   ├── i18n/             # Système de traduction
│   └── utils.ts          # Utilitaires globaux
└── types/                # Définitions TypeScript
```

## Fonctionnalités Clés
- **Internationalisation (i18n) :** Support complet pour le Français, l'Anglais et le Néerlandais.
- **Cedra AI Copilot :** Assistant intelligent pour l'inventaire et les spécifications techniques.
- **Système B2B :** Gestion des comptes Pro, prix de gros, conditions de paiement à 30 jours.
- **Prédiction de Demande :** Utilisation de l'IA pour prévoir les ventes et optimiser les stocks.
- **Recherche Visuelle :** Modal de recherche visuelle intégrée.
- **Commande Rapide :** Interface optimisée pour les commandes en gros par références.

## Commandes Utiles
- `bun dev` : Lance le serveur de développement avec Webpack.
- `bun build` : Compile l'application pour la production.
- `npm run lint` : Exécute ESLint pour vérifier la qualité du code.

## Directives de Développement
- **Best Practices :** Toujours utiliser le skill `vercel-react-best-practices` situé dans `~/.gemini/skills/` pour toute modification, création ou refactorisation de code React/Next.js. Prioriser l'élimination des cascades (waterfalls), l'optimisation du rendu et l'utilisation des Server Components.
