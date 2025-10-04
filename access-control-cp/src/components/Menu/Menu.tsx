import { Link } from "react-router-dom";

export default function Menu(){
    return(
        <nav>
            <Link to="/">Página de Login</Link>
            <Link to="/cadastro">Página de Cadastro</Link>
        </nav>
    );
}