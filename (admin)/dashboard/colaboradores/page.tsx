"use client";
import Header from "@/components/Header";
import { User } from "@/components/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Colaborades = () => {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getEmployee();
  }, [query]);

  const searchData = () => {
    if (query) {
      // Funçao que busca o  usuario dentro do array de user  o some retorna apenas se um valor for verdadeiro  exemplo se buscar pelo primeiro nome  vai listar todos os user com o nome procurado
      const filterUser = employees?.filter((employee: User) => {
        const searchWords = query.toLowerCase().split(" ");
        return searchWords.some((word) =>
          employee.name.toLowerCase().includes(word)
        );
      });
      setEmployees(filterUser);
      return;
    }
  };
  const getEmployee = async () => {
    const res = await fetch("http://localhost:5000/users", {
      method: "GET",
    });
    const data = await res.json();
    setEmployees(data);
    return;
  };

  const deletEmployee = async (id: String, name: String) => {
    console.log(id);
    const delt = await Swal.fire({
      position: "center",
      title: "Tem certeza?",
      text: `Você deseja deletar o colaborador ${name}?`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#333",
      confirmButtonText: "Deletar",
      confirmButtonColor: "#d55",
    });
    if (delt.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/user-delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        await Swal.fire(
          "Usuário deletado com sucesso!",
          "Clica no botão para continuar!",
          "success"
        );
        getEmployee();
        return;
      } catch (error) {
        console.log(error);

        await Swal.fire(
          "Erro ao deletar o usuário!",
          "Clica no botão para continuar!",
          "error"
        );
      }
    }
  };

  return (
    <section className="w-full h-full  flex items-center flex-col px-4 gap-4">
      <Header
        search={searchData}
        value={query}
        onChange={(e: any) => setQuery(e.target.value)}
        placeholder={"Buscar por nome.."}
      />

      {employees.length > 0 ? (
        <>
          <table className="w-full bg-white ">
            <thead className="bg-[#005183] text-white">
              <tr>
                <th className="py-2 px-4 text-left"></th>
                <th className="py-2 px-4 text-left">Nome</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Telefone</th>
                <th className="py-2 px-4 text-left">Creci</th>
                <th className="py-2 px-4 text-left">Publicações</th>
                <th className="py-2 px-4 text-left">Ações</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              {employees?.map((employee: User, index: number) => (
                <tr key={index} className="border-b-[1px] border-gray-300">
                  <td className="py-2 px-4">
                    <img
                      src={employee.avatar ? employee.avatar : "/user.png"}
                      alt={employee.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="py-2 px-2">{employee.name}</td>
                  <td className="py-2 px-2">{employee.email}</td>
                  <td className="py-2 px-2">{employee.phone}</td>
                  <td className="py-2 px-2">
                    {employee.creci} / {employee.creciUF}
                  </td>
                  <td className="py-2 px-2"> {employee.houses?.length}</td>
                  <td className="py-2 px-2 flex gap-2 ">
                    <Link href={`/dashboard/colaboradores/${employee.id}`}>
                      <button className="text-[#005183]">Editar</button>
                    </Link>
                    <button
                      onClick={() => deletEmployee(employee.id, employee.name)}
                      className="text-red-500"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full flex items-center justify-center">
            <Link href={"/dashboard/colaboradores/adicionar_colaborador"}>
              {" "}
              <button className="px-4 py-2 bg-[#005183] rounded-md text-white">
                Adicionar Colaborador
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center ">
          <p className="text-2xl text-gray-400">Usuário encontrado !</p>
        </div>
      )}
    </section>
  );
};

export default Colaborades;
