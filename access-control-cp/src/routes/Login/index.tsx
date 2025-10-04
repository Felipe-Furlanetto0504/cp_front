import { useForm } from "react-hook-form";
import type { Login } from "../../types/login";

export default function Login(){
    const{
        register,
        handleSubmit,
        formState:{errors},
    } = useForm<Login>();

    const onSubmit = async (data: Login) => {
        try{
            const response = await fetch("http://localhost:3000/login",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if(!response.ok) throw new Error("Erro ao fazer login");

        } catch(error){
            console.error(error);
            alert("Erro ao fazer login");
        }
    };


    return(
        <div>
            <h1>Página de Login</h1>
        </div>
    );
}