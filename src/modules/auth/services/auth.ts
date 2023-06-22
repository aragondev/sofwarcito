import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {auth} from "@/common/config/FirebaseConfig";

export async function googleSignIn(){
    const provider = new GoogleAuthProvider();

    return await signInWithPopup(auth, provider)
}

export async function logout() {
    return await signOut(auth);
}

export function isAuthenticated(){
    let currentUser=null;
    onAuthStateChanged(auth, (user) => {
            currentUser=user
    });

    return !!currentUser;
}
