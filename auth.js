import { auth } from './firebase.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Sign up function
export async function signUp(email, password) {
    try {
        console.log('Attempting to sign up with:', email);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Sign up successful:', userCredential.user);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Sign up error:', error);
        // Return more detailed error information
        return { 
            success: false, 
            error: error.message,
            code: error.code,
            details: error
        };
    }
}

// Sign in function
export async function signIn(email, password) {
    try {
        console.log('Attempting to sign in with:', email);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Sign in successful:', userCredential.user);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Sign in error:', error);
        return { 
            success: false, 
            error: error.message,
            code: error.code,
            details: error
        };
    }
}

// Sign out function
export async function logout() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { 
            success: false, 
            error: error.message,
            code: error.code,
            details: error
        };
    }
}

// Auth state listener
export function onAuthStateChange(callback) {
    return onAuthStateChanged(auth, callback);
}
