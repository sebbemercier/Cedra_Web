🩸 CEDRA Frontend - Ultimate Architecture Documentation (v1.0)

Cedra est une plateforme de marketplace de produits électriques , caméras et autres équipements pour les entreprises et particuliers.
Document de référence technique pour le développement du Frontend Cedra.
Stack Cible : Next.js 16, Tailwind v4, Bun.
Identité : Rouge & Noir (Zinc Profond).
⚡ Tech Stack & Tools

Runtime : Bun (Install, Run, Test).
Core : Next.js 16 (App Router, Server Actions, React Compiler).
Style : Tailwind CSS v4 (CSS-first config, Oxide Engine).
UI Lib : Shadcn UI (Radix) + Framer Motion (Animations).
State :
Server : Native Fetch (Next.js Cache) & TanStack Query (Client-side usage).
App State : Zustand.
URL State : Nuqs.


i18n : next-intl (Middleware & Server Components support).


🎨 Design System: "Pulse & Void"
Le design est Strictly Dark Mode. Pas de thème clair.
Palette (Tailwind v4 Configuration)
Utilisation du "Zinc sombre" (Plus ergonomique que le noir pur) et du "Rouge Cedra".
@theme {
  /* --- COULEURS --- */
  --color-cedra-500: #E60023; /* Rouge primaire */
  --color-cedra-600: #B9001D; /* Active/Hover */
  --color-cedra-glow: rgba(230, 0, 35, 0.5); /* Effet néon */

  --color-void: #09090b;      /* Zinc 950 - Fond Principal */
  --color-surface: #18181b;   /* Zinc 900 - Cards/Sidebars */
  --color-border: #27272a;    /* Zinc 800 - Bordures subtiles */
  --color-text-main: #f4f4f5; /* Zinc 100 */
  --color-text-muted: #303036ff;/* Zinc 400 */

  /* --- FONTS --- */
  --font-display: "Geist", sans-serif;
  --font-body: "Inter", sans-serif;
}
Règles UI

Ombres Rouges : Utiliser des shadow-cedra-glow subtiles pour les éléments actifs (boutons, inputs focus).
Transparence : Les modales et headers utilisent un fond bg-void/80 backdrop-blur-md.


🏗️ Architecture du Projet
Application monorepo unifiée avec séparation logique via Route Groups et Internationalization.
src/
├── app/
│   ├── [locale]/             # FR / NL / EN
│   │   ├── (storefront)/     # Application B2C (Marketplace)
│   │   │   ├── layout.tsx    # Header avec Recherche "Siri" & Panier
│   │   │   └── page.tsx      # Landing
│   │   ├── (admin)/          # Dashboard B2B Control Tower
│   │   │   ├── layout.tsx    # Sidebar Admin + Auth Guard strict
│   │   │   └── products/     # TanStack Tables complexes
│   │   ├── layout.tsx        # Root Layout (Fonts, Providers)
│   │   └── error.tsx
├── components/
│   ├── admin/                # KPI Cards, DataTables
│   ├── store/                # Product Cards, Cart Drawer
│   ├── ui/                   # Shadcn Primitives (Button, Input...)
├── lib/
│   ├── api.ts                # Fetch wrappers typés
│   ├── auth.ts               # Gestion JWT/Cookies
├── messages/                 # Fichiers de traduction (fr.json, nl.json...)

📡 Data & API Strategy
Backend : Go FastHTTP.
Auth : JWT (Shared with iOS/Android).

Server Components (Défaut) :

Utiliser fetch natif directement vers l'API Go.
Pas de BFF. Le composant serveur appelle l'API Go.
Propagation des cookies (Auth) obligatoire via headers().

// Exemple Fetch Serveur avec Auth
import { cookies } from 'next/headers';

async function getOrders() {
  const token = cookies().get('session_token');
  const res = await fetch(`${process.env.API_URL}/orders`, {
    headers: { Authorization: `Bearer ${token?.value}` }
  });
  return res.json();
}

Client Components (Interactivité) :

Utiliser Server Actions pour les mutations (POST/PUT/DELETE).
Utiliser TanStack Query uniquement si du polling ou de la revalidation complexe est nécessaire en temps réel.


Authentification :

Login via Server Action -> Appel Go -> Récupération JWT.
Stockage JWT dans HTTPOnly Cookie (Secure, SameSite).
Middleware Next.js vérifie la présence du cookie pour protéger /admin.




🧩 Features Spécifiques "High-Tech"
1. Voice Commerce ("Siri UI")

Composant : VoiceCommandOverlay.tsx.
Comportement : Bouton flottant ou icône micro dans la SearchBar.
Action : Au clic, overlay flou (backdrop-blur). Animation d'onde sonore Rouge réactive au volume.
Tech : Web Speech API pour le Speech-to-Text immédiat -> Envoi texte à l'IA de recherche.

2. Visual Search

Composant : VisualSearchDropzone.tsx.
Comportement : Drag & Drop d'une image directement sur la barre de recherche.
Feedback : Loader circulaire rouge pendant l'analyse des embeddings.

3. Admin Data Tables

Lib : TanStack Table v8.
Design :
Header sticky fond noir.
Lignes zébrées subtiles (Zinc-900 / Zinc-950).
Actions (Edit/Delete) survolables en rouge.
Virtualisation si > 1000 lignes.


🧪 Testing & Quality
Utilisation de Bun Test pour la rapidité.
# Lancer les tests
bun test

# Tests spécifiques
bun test components/ui/button.test.tsx

Unit Tests : Pour les utilitaires (lib/) et les hooks complexes.
Component Tests : Vérifier le rendu des composants critiques (Panier, Auth Form).
Typage : Strict. Utiliser Zod pour valider les réponses API entrantes (surtout pour l'Admin).


📜 Règles de Développement "Claude"

Performance First : Toujours utiliser <Image> de Next.js. Éviter les "Layout Shifts" (CLS). Si un composant est lourd, utiliser dynamic import ou Suspense.
Code Style : Composants fonctionnels courts. Extraire la logique dans des Hooks custom (useCart, useVoice).
i18n : Ne jamais hardcoder de texte. Toujours utiliser t('key') via useTranslations().
Tailwind v4 : Ne pas utiliser @apply dans le CSS sauf pour les resets globaux. Utiliser les classes utilitaires directement dans le TSX.


Fichier de référence pour le projet Cedra. À respecter pour chaque génération de code.