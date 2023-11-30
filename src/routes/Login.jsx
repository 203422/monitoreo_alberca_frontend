import Form from '../components/Form';
import io from 'socket.io-client';
import '../assets/styles/login.css';
import socket from '../libs/socket';

const Login = () => {

    return (
        <>
            <div className='container_login'>

                <div className='container_login_form'>
                    <Form />
                </div>

            </div>

        </>
    );
}

export default Login;