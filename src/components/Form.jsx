import '../assets/styles/form.css'
import { useState } from 'react';
import { useAuth } from '../auth/authProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import { API_URL } from '../auth/constatns';

const Form = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");

    const auth = useAuth();
    const goTo = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (response.ok) {
                setErrorResponse("");
                console.log("sesion iniciada");
                const json = await response.json();

                if (json.accessToken && json.refreshToken) {
                    auth.saveUser(json);
                }

                goTo("/dashboard");

            } else {
                const json = await response.json();
                setErrorResponse(json.error);
                console.log(json.error)
            }

        } catch (error) {
            console.log(error);
        }

    }

    if (auth.isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="title_form">¡Bienvenido!</h1>
                <p>Por favor ingresa tus datos</p>
                {!!errorResponse && <div className='errorMessage'>{errorResponse}</div>}
                <input
                    className="input"
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="input"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>
                    Entrar
                </button>
            </form>
        </>
    );
}

export default Form;