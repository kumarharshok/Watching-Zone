# Watching Zone Project

This is a Netflix clone built as part of a college project. It mimics the layout and functionality of Netflix, including features like user authentication (via Firebase), movie listing (using TMDB API), and dynamic content loading.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Firebase Configuration](#firebase-configuration)
- [Deployment](#deployment)
- [License](#license)

## About

This project is a simple clone of Netflix. It allows users to:
- Sign up and log in to the platform using Firebase Authentication.
- Browse movies and TV shows pulled from the [TMDB API](https://www.themoviedb.org/).
- Watch trailers of movies.
- Responsive design that works on both desktop and mobile devices.

## Features

- **Authentication**: Firebase Authentication for user sign-up, login, and session management.
- **Movie Data**: Movies and TV shows data fetched dynamically from TMDB API.
- **Responsive Design**: User-friendly interface designed for both mobile and desktop.
- **Search**: Users can search for movies or TV shows.
- **Watch Trailers**: Option to view trailers for movies and TV shows.

## Tech Stack

- **Frontend**:
  - HTML
  - CSS (Custom styling)
  - JavaScript (for interactivity)
  - Firebase Authentication
  - TMDB API
  
- **Backend**:
  - Firebase (for authentication and Firestore, if needed)
  
- **Deployment**:
  - [Vercel](https://watching-zone-omega.vercel.app/) for hosting the site.

## Setup Instructions

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/netflix-clone.git
   cd netflix-clone

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Follow the Firebase setup instructions to create a Firebase project and add the necessary configuration to the `.env` file.
   - Ensure that the Firebase project is set up with the required services (Authentication, Firestore, etc.) and that the API keys are correctly configured.

4. Run the application:
   ```bash
   npm start
   ```

5. Open the application in your browser:
   - The application will be accessible at `http://localhost:3000`.

## Firebase Configuration

Before deploying the application, make sure to configure Firebase in the `.env` file. Add the following lines to the `.env` file:

```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

Replace the placeholders with your actual Firebase project configuration.

## Deployment

To deploy the application to Vercel, follow 
