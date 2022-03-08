import './SignInPage.css';
import SignInForm from '../components/SignInForm';
import Illustration from '../components/Illustration';
import * as Constants from '../constants';
import SignUpForm from '../components/SignUpForm';

function SignInPage(props) {
    return (
        <section id="login">
            <div className="container">
                <div className="d-flex flex-column justify-content-between align-items-center">
                    <h1 className="loginHeading">{Constants.APP_TAGLINE}</h1>
                    {props.signup ? <SignUpForm /> : <SignInForm />}
                    <Illustration />
                </div>

            </div>
        </section>
    )
}

export default SignInPage;