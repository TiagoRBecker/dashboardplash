"use client";
import Header from "@/components/Header";
import { Houses } from "@/components/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { baseURL } from "@/components/utils/api";
import Swal from "sweetalert2";

const ImovesList = () => {
  useEffect(() => {
    getMagazines();
  }, []);
  const [loading, setLoading] = useState(true);
  const [magazines, setMagazine] = useState([]);
  const searchData = () => {};
  const getMagazines = async () => {
    const magazines = await fetch(`${baseURL}/magazines`, {
      method: "GET",
    });
    const response = await magazines.json();
    setMagazine(response);
    setLoading(false);
    return;
  };
  const deletMagazine = async (id: any, name: any) => {
    const del = await Swal.fire({
      position: "center",
      title: "Tem certeza?",
      text: `Deseja deletar a Revista ${name}?`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d55",
      confirmButtonText: "Deletar",
      confirmButtonColor: "#00FF00",
    });

    if (del.isConfirmed) {
      try {
        const deletArticle = await fetch(`${baseURL}/delet-magazine`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, name }),
        });

        await Swal.fire(
          `Revista ${name} deletado com sucesso!!`,
          "Clica no botão para continuar!",
          "success"
        );
        await getMagazines();
      } catch (error) {
        console.log(error);
        //Exibe o modal de erro caso exista um
        await Swal.fire(
          "Erro ao deletar o Revista!",
          "Clica no botão para continuar!",
          "error"
        );
      }
    }
  };
  if (loading) {
    return (
      <section className="w-full h-screen flex flex-col items-center justify-center px-4 ">
        <Spinner />
      </section>
    );
  }

  return (
    <section className="w-full h-full flex  flex-col items-center px-4 gap-4 overflow-y-auto">
      <Header search={searchData} />
    
      {magazines && magazines.length > 0 ? (
        <>
          <table className="w-full bg-white ">
            <thead className="bg-[#14b7a1]  text-white text-sm">
              <tr>
                <th className="py-2 px-4 text-left"></th>
                <th className="py-2 px-4 text-left">Nome</th>
                <th className="py-2 px-4 text-left">Editora</th>
                <th className="py-2 px-4 text-left">Volume </th>
                <th className="py-2 px-4 text-left">Categoria </th>
                <th className="py-2 px-4 text-left">Artigos</th>
                <th className="py-2 px-4 text-left">Preço</th>
                <th className="py-2 px-4 text-left">Ações </th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              {magazines?.map((magazine: any, index: number) => (
                <tr key={index} className="border-b-[1px] border-gray-300">
                  <td className="py-2 px-4">
                    <img
                      src={magazine?.cover[0] as any}
                      alt={magazine.name}
                      className="w-20 h-20 object-contain"
                    />
                  </td>
                  <td className="py-2 px-4">{magazine.name} </td>
                  <td className="py-2 px-4"> {magazine.company}</td>
                  <td className="py-2 px-4"> {magazine.volume}</td>
                  <td className="py-2 px-4">{magazine.Category?.name} </td>
                  <td className="py-2 px-4">{magazine.article.length} </td>
                  <td className="py-2 px-4 ">
                    {Number(magazine.price)?.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="py-2 px-4 ">
                    <div className="w-full h-full ">
                      <Link href={`/dashboard/revistas/${magazine.id}`}>
                        <button className="text-[#005183]">Editar</button>
                      </Link>
                    </div>

                    <button
                      className="text-red-500"
                      onClick={() => {
                        deletMagazine(magazine.id, magazine?.name);
                      }}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full flex items-center justify-center mt-4">
            <Link href={`/dashboard/revistas/cadastrar`}>
              <button className="px-4 py-2 bg-[#14b7a1]  rounded-md text-white">
                Adiconar Nova Revista
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-gray-400">Nenhuma revista cadastrada!</p>
          <div className="w-full flex items-center justify-center">
            <Link href={"/dashboard/revistas/cadastrar"}>
              <button className="px-4 py-2 bg-[#14b7a1]  rounded-md text-white">
                Adiconar Nova Revista
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default ImovesList;
