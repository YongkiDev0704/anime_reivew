# 🎬 Anigiri — Anime Review & Discovery Platform

## 📌 Overview

**Anigiri** is a full-stack anime review platform where users can explore trending anime, write reviews, and view community ratings.  
It combines **GraphQL** and **REST** APIs, uses data from **TMDB** and **AniList**, and is optimized for both desktop and mobile users.

---

## 🚀 Live Demo

- **Frontend (Vercel)**: [https://anigiri.net](https://anigiri.net)  
- **Backend (Render)**: [https://anigiri.onrender.com](https://anigiri.onrender.com)

---

## 🧩 Key Features

- ✅ Real-time anime search using TMDB and AniList APIs  
- ✅ User-generated reviews: create, edit, and delete  
- ✅ Auto-cached popular anime list (refreshed every 24 hours)  
- ✅ GraphQL-powered data querying    
- ✅ REST + GraphQL hybrid backend  
- ✅ CORS handling & cold start optimization for Render

---

## 🛠 Planned Updates

- 📱 Mobile responsive design
- 🔐 User login and authentication system
- 🤖 Anime recommendation system (based on user activity)
- ⭐ Review rating (likes or stars)
- 🧑‍💻 User profile page with watchlist
- 🧹 Admin moderation tools
- 🌍 Multi-language support (English/Korean)
- 🔍 Advanced search and filters

---

## ⚙️ Tech Stack

| Area          | Tech                        |
|---------------|-----------------------------|
| Frontend      | Vite, React, TypeScript, styled-components, Apollo Client |
| Backend       | Node.js, Express, GraphQL (Apollo Server), REST |
| Database      | MongoDB Atlas, Mongoose + Typegoose |
| External APIs | TMDB, AniList  |
| DevOps        | Vercel (frontend), Render (backend), pnpm workspaces |

---

## 🗂 Project Structure

The project is organized as a **pnpm monorepo** with **pnpm**, separating the frontend, backend, and shared packages:
<pre><code> 
 root ├── src/ ├── apps/ │ ├── api/ # Backend application (GraphQL + REST with Express) │
                           └── web/ # Frontend application (React + Vite)
               ├── packages/ │ ├── core/ # Core logic: database connection, configs, constants │
                               └── shared/ # Shared types and utilities across apps
  ├── tsconfig.base.json # Shared TypeScript config </code></pre>

- `apps/` contains deployable applications.
- `packages/` contains shared logic reused by both frontend and backend.
- `tsconfig.base.json` is extended by each package's `tsconfig.json`.

---

## 👥 Contributors

- **Yongki Kim** — Full Stack Developer/Team Lead
  [yongkidev0704@gmail.com](mailto:yongkidev0704@gmail.com)
  
- **Donghyeon Lee** — Full Stack Developer
  [dlelfo7@gmail.com](mailto:dlelfo7@gmail.com)
  
- **Jongseok We** — UI/UX Engineer
  [jongseok.we@gmail.com](mailto:jongseok.we@gmail.com)
  
---

