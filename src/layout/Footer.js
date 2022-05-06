import { Button, Container, Progress, Toast, ToastBody, ToastHeader } from 'reactstrap';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <Container fluid className="notifications">
                {/* <Toast className="notification-item">
                    <ToastHeader close={ <Button close /> }>
                        <strong className="ml-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                    </ToastHeader>
                    <ToastBody>Hello, world! This is a toast message.</ToastBody>
                </Toast> */}
            </Container>

            <Container className="progressContainer">
                <p>Service Hours Progress</p>
                <Progress min={ 0 } max={ 30 } value={ 5 } />
            </Container>
        </footer>
    );
}

export default Footer;