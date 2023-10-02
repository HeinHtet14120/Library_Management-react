import { signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase';

export default function useSignOut() {

    let [error,setError] = useState(null);
    let [loading,setLoading] = useState(null);
    

    const logout = async () => {
        try{
            setLoading(true);
            let res = await signOut(auth);
            setError('')
            setLoading(false);
            return res.user;
        }catch(e) {
            setLoading(false)
            setError(e.message);
        }

    }

    return {error,loading,logout}
}