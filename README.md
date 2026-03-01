# 🎬 AnimesVerse

A modern, responsive Anime Discovery Web Application built with **React.js** that delivers real-time anime data using the Jikan API.

Inspired by modern movie streaming platforms, AnimesVerse allows users to explore trending anime, view detailed information, watch trailers, browse episodes, and discover recommendations — all in one place.

🌐 **Live Demo:** https://animesverse.netlify.app

---

## 🚀 Key Features

- 🔍 Real-time Anime Search
- 📄 Detailed Anime Information Page
- 🎥 Trailer Playback (YouTube Embedded Player)
- 📺 Episode Listing with Pagination
- ⭐ Ratings, Genres, Studios & Metadata
- 🔥 Personalized Recommendation Section
- 🏷 Seasonal & Top Anime Sections
- ⚡ Optimized API Calls with Caching (Rate Limit Handling)
- 🎨 Smooth Animations & Modern UI
- 📱 Fully Responsive Design

---

## 🛠 Tech Stack

**Frontend:**

- React.js
- Vite
- React Router DOM
- Tailwind CSS
- CSS3
- React Icons
- Framer Motion
- Swiper.js

**API Integration:**

- Jikan API (Unofficial MyAnimeList API)

**Deployment:**

- Netlify

---

## 📡 API Endpoints Used

The application fetches real-time data from Jikan API using:

- `/anime/{id}/full`
- `/anime/{id}/episodes`
- `/anime/{id}/recommendations`
- `/anime?q=searchQuery`
- `/top/anime`
- `/seasons/now`

Optimized to reduce unnecessary calls and handle API rate limits efficiently.

---

## 🏗 Project Architecture

src/
├── api/ # API Fetch Logic
├── components/ # Reusable UI Components
├── assets/ # Static Assets
├── App.jsx # Main Routing
└── main.jsx # Entry Point

The project follows a modular and scalable component-based architecture.

---

## 📦 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/your-username/animesverse.git

Navigate into the project:

cd animesverse

Install dependencies:

npm install

Run development server:

npm run dev

Build for production:

npm run build
```

👨‍💻 Author

Sachin Yadav
Frontend Developer | React Enthusiast

GitHub: https://github.com/sjyadav07
