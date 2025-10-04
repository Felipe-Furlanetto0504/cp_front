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
      <section>
        <div>
            <h1>Cadastro de Usuário</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email:</label>
                <input type="email" placeholder="SeuEmail@.com" 
                {...register("email",{required: "o email é obrigatório"})}/>

                {errors.email &&(
                    <span>
                        {errors.email.message}
                    </span>
                )}

            </form>
        </div>
      </section>
    );
}