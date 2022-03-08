import * as Constants from '../constants';

function Footer() {
    return (
        <footer>
            <div className="container">
                <p>&copy; 2022 {Constants.APP_NAME}. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;