import './Intro.css';
import * as Constants from '../constants';
import Illustration from './Illustration';

function Intro() {
    return (
        <section id="intro">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>{Constants.APP_TAGLINE}</h1>
                    <Illustration />
                </div>
            </div>
        </section>
    );
}

export default Intro;