🍿 BingeWatchList - Project Documentation

BingeWatchList is a modern, responsive React application designed for users to manage their movie and TV show watchlists with a sleek interface and real-time data integration. This project was developed to master and implement modern web development standards, including CRUD operations, API integration, and State Management.

🚀 Live Application

You can access the live version of the application here: BingeWatchList on Netlify

✨ Core Features

The application includes all essential functions expected from a modern web tool:

1. Dynamic Search & Autocomplete

As the user starts typing (3+ characters), the app fetches the top 5 most relevant movie suggestions in real-time using the OMDb API. This significantly enhances the User Experience (UX).

2. Real-Time Data Enrichment

For every movie added, the app doesn't just store the title; it fetches the official IMDb Rating, Release Year, and Correct Title from the internet.

3. Full CRUD Lifecycle

Create: Add new movies to the list via search suggestions or manual entry.

Read: Display the collection in elegant cards with rating and year details.

Update: Toggle "Watched" status using a checkbox (includes a visual strike-through effect).

Delete: Instantly remove unwanted entries from the list.

🛠️ Tech Stack

Technology

Purpose

ReactJS (Vite)

Component-based UI development and state management.

Tailwind CSS

Modern, responsive, and sleek design system.

OMDb API

Access to real-world movie data and details.

Git & GitHub

Version control and code repository hosting.

Netlify

Continuous Deployment (CD) for live hosting.

📂 Project Structure

src/
├── App.jsx        # Main application logic and UI components.
├── main.jsx       # Entry point connecting React to the DOM.
└── index.css      # Tailwind CSS directives and global styles.


🎨 Design Principles

Color Palette: A "Slate & Indigo" theme (Calm Grey and Vibrant Blue) was used to create a professional and eye-friendly interface.

Typography: High-readability, modern sans-serif fonts were chosen.

Interaction: User interaction is enhanced with hover effects and smooth transitions.

⚙️ Installation & Setup

To run this project on your local machine:

Clone the repository: git clone https://github.com/pxlnstn/watchlist-app.git

Install dependencies: npm install

Start the app: npm run dev

This project was developed by Pelin Su Üstün as part of a Modern Javascript Application Development course.

Note: Movie data provided by OMDb API.
