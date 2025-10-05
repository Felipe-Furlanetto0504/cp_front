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
        <section  className="bg-[#2a1d9b] h-127 w-340">  
            <div  className="max-w-md mx-auto mt-12 p-6 border border-gray-300 rounded-xl shadow-md bg-white">
                <h1  className="text-2xl font-bold text-center mb-6">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label  className="mt-4 font-medium">Email:</label>
                    <input type="email" placeholder="SeuEmail@.com" 
                    {...register("email",{required: "o email é obrigatório"})}  className="mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>

                    {errors.email &&(
                        <span  className="text-red-600 text-sm mt-1">
                            {errors.email.message}
                        </span>
                    )}

                    <label  className="mt-4 font-medium">Nome de usuario:</label>
                    <input type="text" placeholder="SeuNomeDeUsuario" 
                    {...register("nomeUsuario",{required: "o nome de usuário é obrigatório"})} className="mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>

                    {errors.nomeUsuario &&(
                        <span  className="text-red-600 text-sm mt-1">
                            {errors.nomeUsuario.message}
                        </span>
                    )}

                    <button type="submit">Login</button>

                </form>
            </div>
        </section>
    );
}