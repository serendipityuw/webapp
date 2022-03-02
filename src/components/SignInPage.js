import './SignInPage.css';
import SignInForm from './SignInForm';
import Illustration from './Illustration';
import * as Constants from '../constants';

function SignInPage(props) {
    return (
        <section id="login">
            <div className="container">
                <div className="d-flex flex-column justify-content-between align-items-center">
                    <h1 className="loginHeading">{Constants.APP_TAGLINE}</h1>
                    <SignInForm />
                    <Illustration />
                </div>

            </div>
        </section>
    )
}

export default SignInPage;