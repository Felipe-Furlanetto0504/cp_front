import { Link } from "react-router-dom";

export default function Menu(){
    return(
        <nav className="flex space-x-6 text-white font-medium space-y-4 p-2">
            <Link to="/"  className="hover:text-gray-200 transition">Página de Login</Link>
            <Link to="/cadastro" className="hover:text-gray-200 transition">Página de Cadastro</Link>
        </nav>
    );
}