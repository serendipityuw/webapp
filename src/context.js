import * as Constants from './constants';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [taskData, setTaskData] = useState({});
    const auth = getAuth();
    const database = getDatabase();

    const getUserData = (user) => {
        return get(child(ref(database), `${Constants.USERS_ENDPOINT}${user.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    const getTaskData = () => {
        return get(child(ref(database), Constants.TASKS_ENDPOINT)).then(snapshot => {
            if (snapshot.exists()) {
                return snapshot.val();
            }
        }).catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                
                getUserData(user).then(data => getTaskData().then(tasks => setUserData({user: user, data: data, tasks: tasks})));
            } else {
                setUserData({user: user});
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={ userData }>{ children }</AuthContext.Provider>
    )
}

