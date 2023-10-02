import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase';

export default function useSignup() {

    let [error,setError] = useState(null);
    let [loading,setLoading] = useState(null);
    

    const signUp = async (email,password) => {
        try{
            setLoading(true);
            let res = await createUserWithEmailAndPassword(auth,email,password);
            setError('')
            setLoading(false);
            return res.user;
        }catch(e) {
            setLoading(false)
            setError(e.message);
        }

    }

    return {error,loading,signUp}
}
