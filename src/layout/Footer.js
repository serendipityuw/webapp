import * as Constants from '../constants';

function Footer() {
    return (
        <footer>
            <div className="container">
                <p>{Constants.APP_NAME}</p>
            </div>
        </footer>
    );
}

export default Footer;