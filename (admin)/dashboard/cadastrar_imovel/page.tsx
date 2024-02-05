"use client";
import Header from "@/components/Header";
import { Houses } from "@/components/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

const ImovesList = () => {
   const [query, setQuery]= useState("")
  const [houses, setHouses] = useState<Houses[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getHouses();
  }, [query]);
  const searchData = () => {
     
    if(query){
     const filterHouse = houses?.filter((houses:Houses)=>houses.city.toLowerCase() === query.toLowerCase())
      setHouses(filterHouse)
     return 
    }
    
  };
  const getHouses = async () => {
    const get = await fetch("http://localhost:5000/houses", {
      method: "GET",
    });

    const res = await get.json();
    setHouses(res);
    setLoading(false);
    return;
  };
  const deletHouse = (id: string, name: string) => {};
  if (loading) {
    return (
      <section className="w-full h-screen flex flex-col items-center justify-center px-4 ">
        <Spinner />
        <p className="text-[#333] text-base">Carregando...</p>
      </section>
    );
  }
  return (
    <section className="w-full h-full py-3 px-4">
      <Header search={searchData}  value={query} onChange={(e:any)=>setQuery(e.target.value)} placeholder={"Buscar por cidade ..."}/>
      {
        houses && houses.length > 0 ?
        <>
         <table className="w-full bg-white ">
        <thead className="bg-[#005183] text-white">
          <tr>
            <th className="py-2 px-4 text-left">Cidade</th>
            <th className="py-2 px-4 text-left">Bairro</th>
            <th className="py-2 px-4 text-left">Metros ²</th>
            <th className="py-2 px-4 text-left">Suítes </th>
            <th className="py-2 px-4 text-left">Dormitórios </th>
            <th className="py-2 px-4 text-left">Garagem </th>
            <th className="py-2 px-4 text-left">Ações </th>
          </tr>
        </thead>
        <tbody className="text-gray-400">
          {houses?.map((house: Houses, index: number) => (
            <tr key={index} className="border-b-[1px] border-gray-300">
              <td className="py-2 px-4">{house.city}</td>
              <td className="py-2 px-4"> {house.district}</td>
              <td className="py-2 px-4"> {house.meters}</td>
              <td className="py-2 px-4"> {house.suite}</td>
              <td className="py-2 px-4"> {house.bedrooms}</td>
              <td className="py-2 px-4"> {house.garage}</td>
              <td className="py-2 px-4 flex gap-2 ">
                <Link href={`/dashboard/cadastrar_imovel/${house.id}`}>
                  <button className="text-[#005183]">Editar</button>
                </Link>
                <button
                  onClick={() => deletHouse(house.id, house.name)}
                  className="text-red-500"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex items-center justify-center mt-4">
        <Link href={`/dashboard/cadastrar_imovel/cadastrar`}>
          <button className=" px-4 py-2 bg-[#005183] text-white rounded-md">
            Adicionar Imóvel
          </button>
        </Link>
      </div>
        </>
        :
        <div className="w-full h-full flex items-center justify-center">
           <p className="text-2xl text-gray-500">Imóvel não encontrado!</p>
        </div>
      }
     
    </section>
  );
};

export default ImovesList;
