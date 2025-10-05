import { useForm } from "react-hook-form";
import type { Cadastro } from "../../types/cadastro";
import { useEffect, useState } from "react";
import type { Login } from "../../types/login";

export default function Cadastro() {
  useEffect(() => {
    document.title = "Cadastro";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Cadastro>();

  const onSubmit = async (data: Cadastro) => {
    try {
      const response = await fetch("http://localhost:3000/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar usuário");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar usuário");
    }
  };

  const [cadastros, setCadastros] = useState<Cadastro[]>([]);
  const [login, setLogin] = useState<Login[]>([]);

  useEffect(() => {
    const fetchCadastros = async () => {
      const response = await fetch("http://localhost:3000/usuario");
      const data: Cadastro[] = await response.json();
      setCadastros(data);
    };
    fetchCadastros();
  }, []);

  useEffect(() => {
    const fetchLogin = async () => {
      const response = await fetch("http://localhost:3000/login");
      const data: Login[] = await response.json();
      setLogin(data);
    };
    fetchLogin();
  }, []);

  return (
    <main className=" w-100 bg-[#90ff95] flex flex-col items-center py-8">
      <section className="w-100  bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Cadastro de Usuário
        </h1>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="block font-medium text-gray-700">Email:</label>
            <input
              type="email"
              placeholder="SeuEmail@.com"
              {...register("email", { required: "o email é obrigatório" })}
              className="mt-1 w-full p-2 border border-gray-300  placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 "
            />

            {errors.email && (
              <span className="text-red-600 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Nome:</label>
            <input
              type="text"
              placeholder="SeuNome"
              {...register("nome", { required: "o nome é obrigatório" })}
              className="mt-1 w-full p-2 border  placeholder-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            {errors.nome && (
              <span className="text-red-600 text-sm">
                {errors.nome.message}
              </span>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Nome De Usuario
            </label>
            <input
              type="text"
              placeholder="SeuNomeDeUsuario"
              {...register("nomeDeUsuario", {
                required: "o nome de usuário é obrigatório",
              })}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md 
             bg-white text-gray-900 placeholder-gray-500
             focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            {errors.nomeDeUsuario && (
              <span className="text-red-600 text-sm">
                {errors.nomeDeUsuario.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 w-full p-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
          >
            Cadastrar
          </button>
        </form>
      </section>

      <section className="mt-10 w-11/12 max-w-5xl">
        <table className="w-full border-collapse border border-green-700 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="py-3 px-4 text-left">id</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Nome</th>
              <th className="py-3 px-4 text-left">Nome De Usuario</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-700">
            {login.map((login, id) => (
              <tr
                key={id}
                className="even:bg-gray-100 hover:bg-green-50 transition-colors"
              >
                <td className="py-2 px-4">{login.id}</td>
                <td className="py-2 px-4">{login.email}</td>
                <td className="py-2 px-4">{login.nome}</td>
                <td className="py-2 px-4">{login.nomeUsuario}</td>
              </tr>
            ))}

            {cadastros.map((cadastro, id) => (
              <tr
                key={id}
                className="even:bg-gray-100 hover:bg-green-50 transition-colors"
              >
                <td className="py-2 px-4">{cadastro.id}</td>
                <td className="py-2 px-4">{cadastro.email}</td>
                <td className="py-2 px-4">{cadastro.nome}</td>
                <td className="py-2 px-4">{cadastro.nomeDeUsuario}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-green-100 text-gray-800 font-medium">
            <tr>
              <td colSpan={4} className="py-2 px-4 text-right">total de cadastros: {cadastros.length}</td>
            </tr>
          </tfoot>
        </table>
      </section>
    </main>
  );
}
