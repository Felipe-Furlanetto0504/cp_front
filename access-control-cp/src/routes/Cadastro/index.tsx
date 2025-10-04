import { useForm } from "react-hook-form";
import type { Cadastro } from "../../types/cadastro";

export default function Cadastro(){

    const{
        register,
        handleSubmit,
       formState:{errors},
    } = useForm<Cadastro>();

    const onSubmit = async (data: Cadastro) => {
        try{
            const response = await fetch ("http://localhost:3000/usuario",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if(!response.ok) throw new Error("Erro ao cadastrar usuário");

        } catch(error){
            console.error(error);
            alert("Erro ao cadastrar usuário");
        }
    };

    return(
        <div>
            <h1>Página de Cadastro</h1>
        </div>
    );
}