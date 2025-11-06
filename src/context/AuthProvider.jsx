import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/firebase.init';
import toast from 'react-hot-toast';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //update user
    const updateUserProfile = (updates) => {
        if (auth.currentUser) {
        return updateProfile(auth.currentUser, updates).then(() => {
            setUser({ ...user, ...updates });
        });
        }
        return Promise.reject(new Error('No user logged in'));
    };

    const signInUser = (email, password) => {
        toast.success('Successfully Logged In!')
        return signInWithEmailAndPassword(auth, email, password)
    }

    // const signInWithGoogle = () => {
    //     setLoading(true);
    //     toast.success('Successfully Logged In!')
    //     return signInWithPopup(auth, googleProvider)
    // }
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };
    const signInWithGoogle = () => {
        return googleSignIn();
    };
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth).then(() => {
        setUser(null);
        setLoading(false);
        });
    };
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged  (auth, (currentUser) => {
            console.log('inside observer: if', currentUser)
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            unsubscribe();
        }
    }, [])


    const authInfo = {
        user,
        loading,
        signInWithGoogle,
        createUser,
        signInUser,
        signOutUser,
        googleSignIn,
        updateUserProfile,

    } 
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;