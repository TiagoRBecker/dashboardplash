"use client";
import { useEffect, useState } from "react";
import useCategory from "@/hooks/category";
const EditCat = ({ params }: { params: { id: string } }) => {
  const slug = params.id;
  //Hook com as funçoes para categoria
  const { category, setCategory, getIdCategory, editCat } = useCategory(slug);
 //Funçao que faz o envio dos dados para backend para ser editado.
  const handleEdit = async (e: any) => {
    e.preventDefault();
    try {
        //Edita a categoria
      const edit = await editCat(slug);
    } catch (error) {
        //Exibe o erro
      console.log(error);
    }
  };
  //Busca a categoria pelo id assim que o componente e montado
  useEffect(() => {
    getIdCategory();
  }, []);

  return (
    <section className=" w-full h-screen flex items-center justify-center">
      <form method="POST" className="w-1/2" onSubmit={handleEdit}>
        
        <h1 className="text-center text-[#005183] text-xl uppercase mb-4 font-bold">
          Editar Categoria
        </h1>

        <input
          type="text"
          className="w-full outline-none border-[1px] border-gray-400 rounded-md pl-2 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <div className="flex items-center justify-center w-full mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-[#005183] rounded-md text-white"
          >
            Editar Categoria
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditCat;
