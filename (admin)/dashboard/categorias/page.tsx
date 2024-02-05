"use client";
import Header from "@/components/Header";
import { Categories } from "@/components/types";
import Link from "next/link";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
const Config = () => {
  useEffect(() => {
    getCategories();
  }, []);
  const [categories, setCategorie] = useState<any>([]);
  const searchData = () => {};
  const getCategories = async () => {
    const get = await fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (get.status === 200) {
      const response = await get.json();

      setCategorie(response);
    }
    return;
  };
  const deletCat = async (id: string, name: String) => {
    const del = await Swal.fire({
      position: "center",
      title: "Tem certeza?",
      text: `Você deseja deletar está a categoria ${name} `,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#333",
      confirmButtonText: "Deletar",
      confirmButtonColor: "#d55",
    });
    if (del.isConfirmed) {
      try {
        //deleta a categoria e apos exibe  um modal Categoria deletada com sucesso!
        const editCat = await fetch(`http://localhost:5000/delete-category`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        if (editCat.status === 200) {
          await Swal.fire(
            "Categoria deletada com sucesso!!",
            "Clica no botão para continuar!",
            "success"
          );
          getCategories();
          return;
        }
      } catch (error) {
        console.log(error);
        //Exibe o modal de erro caso exista um
        await Swal.fire(
          "Erro ao deletar a categoria!",
          "Clica no botão para continuar!",
          "error"
        );
      }
    }
  };

  

  return (
    <section className="w-full h-full flex  flex-col items-center px-4 gap-4">
      <Header search={searchData} />
      <table className="w-full bg-white ">
        <thead className="bg-[#005183] text-white">
          <tr>
            <th className="py-2 px-4 text-left">Nome</th>
            <th className="py-2 px-4 text-left">Publicações</th>
            <th className="py-2 px-4 text-left">Ações</th>
          </tr>
        </thead>
        <tbody className="text-gray-400">
          {categories?.map((category:Categories, index: number) => (
            <tr key={index} className="border-b-[1px] border-gray-300">
              <td className="py-2 px-4">{category.name}</td>
              <td className="py-2 px-4"> 1</td>
              <td className="py-2 px-4 flex gap-2 ">
                <Link href={`/dashboard/categorias/${category.id}`}>
                  <button className="text-[#005183]">Editar</button>
                </Link>
                <button
                  onClick={() => deletCat(category.id, category.name)}
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
        <Link href={"/dashboard/categorias/adicionar_categoria"}>
       
          <button className="px-4 py-2 bg-[#005183] rounded-md text-white">
            Adicionar Categoria
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Config;
