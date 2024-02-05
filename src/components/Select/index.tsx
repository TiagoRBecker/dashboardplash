"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { categories, citys } from "../Mock";

const Select = () => {
    const router = useRouter()
  const [categorie, setCategorie] = useState("");
  const [city, setCity] = useState("");
  useEffect(() => {
    teste();
  }, []);
  const teste = async () => {
    if(!city && !categorie){
        return
    }else{
        router.push(`/search?city=${city}&cat=${categorie}`)
    }
   
  };
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="flex gap-2">
        <select
          className="px-8 py-4 bg-gray-300 flex items-center"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
        >
          {categories.map((categorie: any, index: number) => (
            <option key={index} value={categorie.name}>{categorie.name}</option>
          ))}
        </select>
        <select className="px-8 py-4 bg-gray-300"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          {citys.map((city: any, index: number) => (
            <option key={index} value={city.name}>{city.name}</option>
          ))}
        </select>
        <button type="submit" className="px-4 bg-red-500" onClick={teste}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Select;
