import { Navigate, useLocation } from "react-router-dom";
import * as Constants from "../constants";

function RequireAuth(props) {
    const location = useLocation();

    if (!props.user) {
        return <Navigate to={Constants.SIGNIN_PATH} state={{ from: location }} replace />;
    } else {
        return props.children;
    }

}

export default RequireAuth;