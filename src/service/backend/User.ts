import store from "@/store";
// import axios from "axios";
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FireBase/FireBaseService";
import session from "../session/session";
// import { url } from './constants'

const user = () => session.get('user') ? session.get('user') : null;
const token = () => session.get('user') ? session.get('user').token : null;

export const getUserLogged = () => {
    const u = user();
    return u
}

export const userLogin = async (email: string, password: string): Promise<boolean> => {

    // sign in to google
    const googleSignIn = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            session.set('user', user)
            return true
        })
        .catch(() => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            return false;
        });

    if (!googleSignIn) return false;

    store.dispatch("isUserLoggedToggle", true);
    return true;
}

export const createUserAccount = async (email: string | null, password: string | null) => {

    // create google account
    if (email && password) {
        const googleCreatedAccount = await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                return user ? user : false;
            })
            .catch(() => {
                return false
            });


        return googleCreatedAccount; // && backendCreatedAccount;
    } else {
        return false;
    }
}


export const userLogout = async (): Promise<boolean> => {
    const userToken = token()

    // if has token
    if (!userToken) {
        alert("Missing User Token");
        return false;
    }

    // logout to google
    const googleSignOut: boolean = await signOut(auth).then(() => {
        // Sign-out successful.
        return true
    }).catch(() => {
        // An error happened.
        return false;
    });

    if (!googleSignOut) return false;

    session.remove('user');
    store.dispatch("isUserLoggedToggle", false);
    return true;
}