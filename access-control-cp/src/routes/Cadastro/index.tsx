import { useForm } from "react-hook-form";
import type { Cadastro } from "../../types/cadastro";
import { useEffect, useState } from "react";

export default function Cadastro(){


    useEffect(()=>{
        document.title = "Cadastro";
    },[])

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

    const [cadastros, setCadastros] = useState<Cadastro[]>([]);

    useEffect(()=>{
        const fetchCadastros = async () => {
            const response = await fetch("http://localhost:3000/usuario");
            const data: Cadastro[] = await response.json();
            setCadastros(data);
        }
        fetchCadastros();

    },[]);


    return(
    <main>
      <section className="bg-[#90ff95] h-127 w-340">
        <div className="max-w-md mx-auto mt-5 p-6 border border-gray-300 rounded-xl shadow-md bg-white">
            <h1 className="text-2xl font-bold text-center mb-6">Cadastro de Usuário</h1>
            <form  className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <label className="mt-4 font-medium" >Email:</label>
                <input type="email" placeholder="SeuEmail@.com" 
                {...register("email",{required: "o email é obrigatório"})} className="mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>


                {errors.email &&(
                    <span className="text-red-600 text-sm mt-1" >
                        {errors.email.message}
                    </span>
                )}

                <label className="mt-4 font-medium" >Nome:</label>
                <input type="text" placeholder="SeuNome" 
                {...register("nome",{required: "o nome é obrigatório"})} className="mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>

                {errors.nome &&(
                    <span className="text-red-600 text-sm mt-1" >
                        {errors.nome.message}
                    </span>
                )}

                <label className="mt-4 font-medium" >Nome De Usuario</label>
                <input type="text" placeholder="SeuNomeDeUsuario" 
                {...register("nomeDeUsuario",{required: "o nome de usuário é obrigatório"})} className="mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>

                {errors.nomeDeUsuario &&(
                    <span className="text-red-600 text-sm mt-1">
                        {errors.nomeDeUsuario.message}
                    </span>
                )}
                <button type="submit" className="mt-6 p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors" >Cadastrar</button>
            </form>
        </div>
      </section>

      <table className="tabela">
        <thead>
          <tr>
            <th>id</th>
            <th>Email</th>
            <th>Nome</th>
            <th>Nome De Usuario</th>
          </tr>
        </thead>
                <tbody>
                    {cadastros.map((cadastro,id)=>(
                        <tr key={id}>
                            <td>{cadastro.email}</td>
                            <td>{cadastro.nome}</td>
                            <td>{cadastro.nomeDeUsuario}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3}>total de cadastros: {cadastros.length}</td>
                    </tr>
                </tfoot>
      </table>
    </main>
    );
}