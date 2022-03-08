import * as Constants from './constants';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const auth = getAuth();
    const database = getDatabase();

    const getAccountType = (user) => {
        return get(child(ref(database), `${Constants.USERS_ENDPOINT}${user.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val().accountType
            }
        }).catch((error) => {
            console.error(error);
        });  
    }

    const getClaimedTasks = (user) => {
        
    }

    const getCompletedTasks = (user) => {
        
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getAccountType(user).then(value => setUserData({...userData, user: user, accountType: value}))
            } else {
                setUserData({user: user});
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={ userData }>{ children }</AuthContext.Provider>
    )
}

