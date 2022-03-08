import Intro from "../components/Intro";
import 'firebase/database';
import { useEffect } from "react";


function HomePage(props) {

    useEffect(() => {
       console.log(props.user)
    }, [props.user]);


    return (
        <Intro />
    );
}

export default HomePage;