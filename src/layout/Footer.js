import { useContext } from 'react';
import { Alert, Button, Container, Progress, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { AuthContext } from '../context';
import './Footer.css';

function Footer() {
    const { data } = useContext(AuthContext);
    // const notifications = [{heading: "Serendipity", body: "Hello, world! This is a toast message."}]
    const notifications = []


    return (
        <footer>
            <Container fluid className="notifications">
                {notifications.map(notification => {
                    return <Toast className="notification-item">
                        <ToastHeader close={ <Button close /> }>
                            <strong className="ml-auto">{ notification.heading  }</strong>
                        </ToastHeader>
                        <ToastBody>{ notification.body }</ToastBody>
                    </Toast>
                })}
                
            </Container>

            {data && data.accountType === "Student" ? 
                <Container className="progressContainer">
                    <p>Service Hours Progress</p>
                    { data.hoursGoal ? <Progress min={ 0 } max={ data.hoursGoal } value={ data.hoursCompleted || 0 } /> : <Alert color="primary">Set a Service Hours Goal in <a href='/account'>Account</a> page </Alert> } 
                    
                </Container> : ""
            }
            
        </footer>
    );
}

export default Footer;