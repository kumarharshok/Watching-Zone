import { auth } from './firebase.js';
import { onAuthStateChange } from './auth.js';

// Handle authentication state
onAuthStateChange((user) => {
    console.log('Auth state changed. User:', user);
    const currentPath = window.location.pathname;
    const isAuthPage = currentPath.includes('login.html') || currentPath.includes('signup.html');
    const isMoviesPage = currentPath.includes('movies.html');
    
    console.log('Current path:', currentPath);
    console.log('Is auth page:', isAuthPage);
    console.log('Is movies page:', isMoviesPage);
    
    // If not logged in and trying to access protected pages
    if (!user && (currentPath.includes('index.html') || isMoviesPage)) {
        console.log('Not logged in, redirecting to login');
        window.location.href = "login.html";
    }
    
    // If logged in and on auth pages, redirect to movies
    if (user && isAuthPage) {
        console.log('Logged in, redirecting to movies');
        window.location.href = "movies.html";
    }
});

// Handle sign-in button click
const signInButton = document.querySelector('.signin');
if (signInButton) {
    signInButton.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
}

// FAQ functionality
const questions = document.querySelectorAll('.question');

questions.forEach(question => {
    const button = question.querySelector('button');
    const content = question.querySelector('div');
    const icon = button.querySelector('img');

    button.addEventListener('click', () => {
        // Close all other questions
        questions.forEach(q => {
            if (q !== question) {
                const otherContent = q.querySelector('div');
                const otherIcon = q.querySelector('button img');
                otherContent.style.display = 'none';
                otherIcon.style.transform = 'rotate(0deg)';
            }
        });

        // Toggle current question
        if (content.style.display === 'none' || !content.style.display) {
            content.style.display = 'block';
            icon.style.transform = 'rotate(45deg)';
        } else {
            content.style.display = 'none';
            icon.style.transform = 'rotate(0deg)';
        }
    });
});

// Email form validation
const emailForms = document.querySelectorAll('.email');
emailForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="text"]');
        const email = emailInput.value.trim();
        
        if (!email || !isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Handle email submission
        console.log('Email submitted:', email);
        // Add your email submission logic here
    });
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

