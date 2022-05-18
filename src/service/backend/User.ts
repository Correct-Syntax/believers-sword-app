import store from "@/store";
import axios from "axios";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../FireBase/FireBaseService";
import session from "../session/session";
import { url } from './constants'

const user = () => session.get('user') ? session.get('user') : null;
const token = () => session.get('user') ? session.get('user').token : null;

export const getUserLogged = () => {
    return user();
}

export const userLogin = (email: string, password: string) => {

    // sign in to google
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            // .then((userCredential) => {
            // Signed in 
            // const user = userCredential.user;
            // console.log(user)
        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });

    // sign in to backend
    axios.post(`${url}/api/auth/login`, { email, password }).then(response => {
        console.log(response)
        if (response.data) {
            session.set('user', response.data)
        }

    }).catch(e => {
        console.log(e)
    })

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

    // logout to backend
    const backendSignOut: boolean = await axios.post(`${url}/api/auth/logout`, {}, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }).then(response => {
        if (response.data) {
            session.remove('user')
            return true
        }
        return false

    }).catch(() => {
        return false
    })

    if (!backendSignOut) return false;

    store.dispatch("isUserLoggedToggle", false);
    return true;
}