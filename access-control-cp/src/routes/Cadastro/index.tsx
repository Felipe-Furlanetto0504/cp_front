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
      <section className="bg-[#5d68c9] h-127 w-340">
        <div className="max-w-md mx-auto mt-12 p-6 border border-gray-300 rounded-xl shadow-md bg-white">
            <h1 className="text-2xl font-bold text-center mb-6">Cadastro de Usuário</h1>
            <form  className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <label className="mt-4 font-medium" >Email:</label>
                <input type="email" placeholder="SeuEmail@.com" 
                {...register("email",{required: "o email é obrigatório"})} className="mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"/>


                {errors.email &&(
                    <span className="text-red-600 text-sm mt-1" >
                        {errors.email.message}
                    </span>
                )}

                <label className="mt-4 font-medium" >Nome:</label>
                <input type="text" placeholder="SeuNome" 
                {...register("nome",{required: "o nome é obrigatório"})} className="mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"/>

                {errors.nome &&(
                    <span className="text-red-600 text-sm mt-1" >
                        {errors.nome.message}
                    </span>
                )}

                <label>Nome De Usuario</label>
                <input type="text" placeholder="SeuNomeDeUsuario" 
                {...register("nomeUsuario",{required: "o nome de usuário é obrigatório"})}/>

                {errors.nomeUsuario &&(
                    <span>
                        {errors.nomeUsuario.message}
                    </span>
                )}

                <button type="submit">Cadastrar</button>

            </form>
        </div>
      </section>
    );
}