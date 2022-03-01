import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import * as Constants from "../constants";

function RequireAuth(props) {
    const auth = getAuth();
    const location = useLocation();

    console.log(props.user);
    if (!props.user) {
        return <Navigate to={Constants.SIGNIN_PATH} state={{ from: location }} replace />;
    } else {
        return props.children;
    }

    


}

export default RequireAuth;