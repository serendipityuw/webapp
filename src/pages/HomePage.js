import Intro from "../components/Intro";
import 'firebase/database';
import { useContext, useEffect } from "react";
import { AuthContext } from "../context";


function HomePage() {
    const { user } = useContext(AuthContext);

    useEffect(() => {
       console.log(user);
    }, [user]);


    return (
        <Intro />
    );
}

export default HomePage;