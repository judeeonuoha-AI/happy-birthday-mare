# Happy Birthday, Mare 🌻

A romantic, sunflower-themed virtual birthday card built with React, Vite,
Tailwind CSS, and Firebase. Visitors can leave a name + birthday wish from
their own phone or computer, and it appears — in real time — on everyone
else's screen, including the birthday celebrant's.

The site has **two pages**:

- **`/` — Leave a Wish.** The page to share with friends and family. Shows the
  hero and the wish form only — it does not show other people's wishes, so
  the link stays a nice surprise.
- **`/wishes` — Wishes Wall.** The page for Mare. Shows every wish that's been
  left (live, from everyone, on every device), plus your personal
  handwritten-style message.

Each page has a small pill link in the top-right corner to jump to the other
page. Because this uses hash-based routing (for easy static hosting), the
full URLs are `yoursite.com/#/` and `yoursite.com/#/wishes`.

## Setup

**Requirements:** [Node.js](https://nodejs.org/) 18+ and npm.

```bash
npm install
```

Wishes are stored in a free **Firebase Firestore** database so they sync
live across every visitor's device. Before running the site, follow the
**Firebase setup** section below and create a `.env` file — otherwise the
site will run, but show a banner saying wishes can't be saved yet.

```bash
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To build a production-ready bundle:

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

## Firebase setup (required for live wishes)

This takes about 5 minutes and is free.

1. Go to the [Firebase console](https://console.firebase.google.com/) and
   click **Add project**. Give it any name (e.g. "mare-birthday") and finish
   the wizard (you can disable Google Analytics, it's not needed).
2. In your new project, go to **Build → Firestore Database** in the left
   sidebar, click **Create database**, and choose **Start in production
   mode** (we'll set custom rules in step 4), then pick any region.
3. Register a web app: click the **gear icon → Project settings**, scroll to
   **Your apps**, click the **`</>`** (web) icon, give it a nickname, and
   skip Firebase Hosting. Firebase will show you a `firebaseConfig` object
   like this:
   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "mare-birthday.firebaseapp.com",
     projectId: "mare-birthday",
     storageBucket: "mare-birthday.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef",
   };
   ```
   Copy [`.env.example`](.env.example) to a new file named `.env` in the
   project root, and paste each value in:
   ```
   VITE_FIREBASE_API_KEY=AIza...
   VITE_FIREBASE_AUTH_DOMAIN=mare-birthday.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=mare-birthday
   VITE_FIREBASE_STORAGE_BUCKET=mare-birthday.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```
   These values are not secret (they identify your project, not authorize
   access) — access is controlled by the security rules in the next step.
4. Back in **Firestore Database → Rules**, replace the contents with:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /wishes/{wishId} {
         allow read: if true;
         allow create: if request.resource.data.name is string
                       && request.resource.data.name.size() > 0
                       && request.resource.data.name.size() <= 60
                       && request.resource.data.message is string
                       && request.resource.data.message.size() > 0
                       && request.resource.data.message.size() <= 400;
         allow update: if false;
         allow delete: if true;
       }
     }
   }
   ```
   This lets anyone read and add wishes (needed for the public form), but
   not edit existing ones. `allow delete: if true` is what makes the hidden
   admin "clear all" button work without requiring a login — anyone who
   found that button could technically wipe the wall, which is an
   acceptable trade-off for a private link shared with friends, but keep
   that in mind.
5. Restart `npm run dev` (env vars are only read on startup). The warning
   banner should disappear, and the first person to open `/wishes` will
   automatically seed the wall with the sample wishes from
   [`src/data/sampleWishes.js`](src/data/sampleWishes.js).

## Where to edit things

| What | File |
| --- | --- |
| **Your personal message to Mare** | [`src/components/SpecialMessage.jsx`](src/components/SpecialMessage.jsx) — edit the `PERSONAL_MESSAGE` array (one string per paragraph) and the `SIGNATURE` constant. |
| **Colours / theme** | [`tailwind.config.js`](tailwind.config.js) — edit the `theme.extend.colors` palette (`cream`, `champagne`, `sunflower`, `blush`, `sage`). Changing a hex value here updates it everywhere on the site. |
| **Fonts** | Loaded via Google Fonts in [`index.html`](index.html); mapped to Tailwind names in `tailwind.config.js` under `theme.extend.fontFamily` (`display`, `hand`, `body`). |
| **Default / sample wishes** | [`src/data/sampleWishes.js`](src/data/sampleWishes.js) — used to seed the wall the first time it's ever empty. Edit, add, or remove entries freely. |
| **Hero headline / subtitle / button text** | [`src/components/Hero.jsx`](src/components/Hero.jsx) |
| **Wishes-wall page headline** | [`src/pages/WishesWallPage.jsx`](src/pages/WishesWallPage.jsx) |
| **Footer text** | [`src/components/Footer.jsx`](src/components/Footer.jsx) |
| **Page title / favicon / meta description** | [`index.html`](index.html) and [`public/sunflower.svg`](public/sunflower.svg) |

## How wishes are stored

Wishes live in a Firebase Firestore collection called `wishes`, kept in sync
with every open browser tab in real time via
[`useWishes`](src/hooks/useWishes.js). This means:

- A wish submitted on a friend's phone shows up on Mare's `/wishes` page
  (and anyone else's) within a second or two, no refresh needed.
- If Firebase isn't configured yet, the site falls back to showing the
  local sample wishes read-only, with a banner explaining why.

## Admin controls (hidden)

There's a small, low-contrast dot beneath the footer text. Clicking it opens
an "Admin Options" panel with two actions, applied instantly for everyone
(since the data is shared):

- **Clear all wishes** — empties the wall (asks for confirmation first).
- **Restore sample wishes** — clears the wall and reseeds the default
  sample messages.

No login is required, since this is meant to be a private link shared with
friends/family rather than a public product.

## Background music (optional)

The music toggle button (bottom-right, speaker icon) never autoplays — it
only starts playing after a visitor clicks it. To enable it, add an MP3 file
at `public/music.mp3`. If no file is present, clicking the button simply does
nothing (fails silently).

## Deploying (GitHub Pages)

The build output in `dist/` is a fully static site, so any static host
works. To deploy to **GitHub Pages** specifically:

1. Create a new, empty repository on GitHub (don't initialize it with a
   README).
2. From this project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. Install the `gh-pages` helper and deploy the built site to a `gh-pages`
   branch:
   ```bash
   npm install --save-dev gh-pages
   npm run deploy
   ```
4. On GitHub, go to the repo's **Settings → Pages**, and under "Build and
   deployment", set **Source** to "Deploy from a branch", branch
   `gh-pages`, folder `/ (root)`. Save.
5. Your site will be live at `https://<your-username>.github.io/<repo-name>/`
   within a minute or two. Share `.../#/` with friends and `.../#/wishes`
   with Mare.

Whenever you make changes, just run `npm run deploy` again to publish them.

## Tech stack

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) (hash routing, for static hosting)
- [Firebase Firestore](https://firebase.google.com/docs/firestore) for the
  shared, real-time wishes data
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations/transitions
- [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) for the
  submission celebration effect

## Project structure

```
src/
  components/
    Hero.jsx              Hero section with headline + sunflower illustration
    WishForm.jsx           Name/message form with validation + confetti
    WishWall.jsx            Wishes grid + live counter
    WishCard.jsx             Individual wish card
    SpecialMessage.jsx      Editable handwritten-style love note
    Footer.jsx                Footer + hidden admin trigger
    AdminControls.jsx          Clear-all / restore-samples modal
    MusicToggle.jsx              Background music button (no autoplay)
    FloatingBackground.jsx        Floating petals/hearts decoration
    PageNavLink.jsx                 Small pill link between the two pages
    FirebaseSetupNotice.jsx          Warning banner shown until Firebase is configured
  pages/
    SendWishPage.jsx       Public "/" page: hero + wish form
    WishesWallPage.jsx      "/wishes" page: wishes wall + special message
  data/
    sampleWishes.js       Default wishes used to seed Firestore the first time
  hooks/
    useWishes.js           Real-time Firestore-backed wishes state
  lib/
    firebase.js             Firebase app/Firestore initialization
  App.jsx                 Routes + shared layout (floating bg, music, admin modal)
  main.jsx                 React entry point
  index.css                Tailwind imports + small global styles
```
