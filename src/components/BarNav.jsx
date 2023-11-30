import { Link } from "react-router-dom";
import '../assets/styles/barNav.css';
import { useAuth } from '../auth/authProvider';
import { API_URL } from "../auth/constatns";

const BarNav = () => {

    const auth = useAuth();

    async function handleSignout(e) {
        e.preventDefault();


        try {
            const response = await fetch(`${API_URL}/signout`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getRefreshToken()}`,
                },
            });

            if (response.ok) {
                auth.signOut();
            }

        } catch (error) {

        }
    }

    return (
        <nav className="bar_navigation">
            <div>
                <p className="logo">Monitoreo</p>
            </div>
            <ul className="ul">
                <li className="li">
                    <Link className="link" to="/dashboard">Inicio</Link>
                </li>
                <li className="li">
                    <a href="#" className="link" onClick={handleSignout}>Salir</a>
                </li>
            </ul>
        </nav>
    );
}

export default BarNav;