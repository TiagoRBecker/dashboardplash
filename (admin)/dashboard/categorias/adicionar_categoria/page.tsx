"use client"
import {  useState } from "react"
import useCategory from "@/hooks/category"


const addNewCategory = () => {
    //Hook de funçoes categoria
  const  {addCategory, error,category,setCategory } = useCategory(null)
   
   //Adiciona uma nova categoria
    const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
      try {
        //Funçao que leva os dados para backend
        const add = await addCategory()
      } catch (error) {
        //Funçao que exibe o erro 
        console.log(error)
      }
        
    }

    return (
        <section className=" w-full h-screen flex items-center justify-center">
            <form method="POST" className="w-1/2" onSubmit={handleAddCategory}>
                <h1 className="text-center text-[#005183] text-xl uppercase mb-4 font-bold">Adicionar Categoria</h1>

                <input type="text" className="w-full outline-none border-[1px] border-gray-400 rounded-md pl-2 py-2" value={category} onChange={(e) => setCategory(e.target.value)} />
                {error && <p className="text-red-500 text-center">Necessário preencher o campo da categoria!</p>}       

         <div className="flex items-center justify-center w-full mt-4">

                  <button type="submit" className="px-4 py-2 bg-[#005183] rounded-md text-white">Adicionar Categoria</button>
                   
                </div>

            </form>

        </section>);
}

export default addNewCategory;
