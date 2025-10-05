import Menu from "../Menu/Menu";

export default function Cabecalho(){
    return(
        <header>
            <h1  className="text-2xl font-bold text-white tracking-wide space-y-4 p-2">Controle de Acesso</h1>
            <Menu/>
        </header>
    );
}