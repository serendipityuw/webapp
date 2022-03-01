import illustration from "../img/undraw_grandma.svg";
import './Illustration.css';

function Illustration() {
    return (
        /* Illustration from unDraw.co */
        <img className="illustration" src={illustration}
        alt="illustration of grandma" />
    )
}

export default Illustration;