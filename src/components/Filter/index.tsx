import { useEffect, useState } from "react";
import {
  Lowprices,
  bedrooms,
  citys,
  garage,
  highPrices,
  suites,
} from "../Mock";
import { Categories, Houses } from "../types";
import { useForm } from "react-hook-form";
import { Filter, filter } from "../utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const Filter = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm<Filter>({
    mode: "all",
    resolver: zodResolver(filter),
  });
  useEffect(() => {
    getCategories();
  }, []);
  
  const [categories, setCategories] = useState([]);
  const catID = watch("categories");

  const getCategories = async () => {
    const request = await fetch(`http://localhost:5000/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();
    setCategories(response);

    return;
  };
  //Funçao que filtra as cidades de acordo com a categoria escolhida
  const getCitys = () => {
    //filtra a categoria selecionada
    const filteredHouses = categories.filter(
      (category: Categories) => category.id === Number(catID)
    );

    //Busca pelas casas
    const houses = filteredHouses.map((house: any) => house.Houses);
    //Busca a cidades
    const getCitys = houses[0]?.map((citys: any) => citys.city);
    //retornar um array com as cidades sem duplicados
    return [...(new Set(getCitys) as any)];
  };
  //Funçao  que filtrar os bairros de acordo com a cidade escolhida
  const getDistricts = () => {
    const valueCity = watch("city");
    //Filtra as cidades de acordo com a categoria
    const filteredHouses = categories
      .filter((category: Categories) => category.id === Number(catID))
      .flatMap((category: any) => category.Houses);
    // FIltra os bairros da cidade escolhida
    const filterHouseName = filteredHouses.filter(
      (house: Houses) => house.city === valueCity
    );
    //Retorna os bairros da cidade escolhida
    const districts = filterHouseName?.map((house: Houses) => house.district);
    //Retorn um array de bairros sem duplicados
    return [...(new Set(districts) as any)];
  };

  const onSubmit = handleSubmit(async (data) => {
    const {
      categories,
      city,
      district,
      bedrooms,
      suite,
      garage,
      rangePricelow,
      rangePriceHigh,
    } = data;
    router.push(
      `/search?cat=${categories}&city=${city}&dist=${district}&bd=${bedrooms}&st=${suite}&garage=${garage}&priceL=${rangePricelow}&priceH=${rangePriceHigh}`
    );
  });
   
  //Lista as cidades
  const filterCity = getCitys();
  //Lista os bairros
  const filterDistrict = getDistricts();

  return (
    <form
      method="POST"
      onSubmit={onSubmit}
      className="w-96 h-full flex items-center flex-col gap-6 py-4"
    >
      <h1 className="text-center pt-4 uppercase text-gray-400 font-bold">
        Filtrar Imóvel
      </h1>
      <div className="w-full  ">
        <div className="flex items-center justify-between px-10  gap-2">
          <h2>Categorias</h2>
          <select className="w-1/2 outline-none " {...register("categories")}>
            <option value=""></option>
            {categories?.map((category: Categories, index: number) => (
              <option
                key={index}
                className="text-left pl-2 py-2"
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {errors.categories && (
          <p className="text-sm text-red-400 text-left w-full px-10">
            {errors.categories.message}
          </p>
        )}
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between px-10 w-full gap-2 ">
          <h2>Cidade</h2>
          <select className="w-1/2 outline-none " {...register("city")}>
            <option value=""></option>
            {filterCity?.map((city: string, index: number) => (
              <option key={index} className="text-left pl-2 py-2" value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        {errors.city && (
          <p className="text-sm text-red-400 text-left w-full px-10">
            {errors.city.message}
          </p>
        )}
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between px-10 w-full gap-2 ">
          <h2>Bairros</h2>
          <select className="w-1/2 outline-none " {...register("district")}>
            <option value=""></option>
            {filterDistrict.length > 0 ? (
              <>
                {filterDistrict?.map((name: String, index: number) => (
                  <option
                    key={index}
                    className="text-left pl-2 py-2"
                    value={name as string}
                  >
                    {name}
                  </option>
                ))}
              </>
            ) : (
              <option value="all bairros">Não possui bairro para cidade</option>
            )}
          </select>
        </div>
        {errors.district && (
          <p className="text-sm text-red-400 text-left w-full px-10">
            {errors.district.message}
          </p>
        )}
      </div>
      {catID === "2" || catID === "4" ? (
        <></>
      ) : (
        <>
          <div className="w-full">
            <div className="flex items-center justify-between px-10 w-full gap-2 ">
              <h2>Dormitórios</h2>
              <select className="w-1/2 outline-none " {...register("bedrooms")}>
                <option value=""></option>
                {bedrooms?.map((name: String, index: number) => (
                  <option
                    key={index}
                    className="text-left pl-2 py-2"
                    value={name as string}
                  >
                    Dormitórios {name}
                  </option>
                ))}
              </select>
            </div>
            {errors.bedrooms && (
              <p className="text-sm text-red-400 text-left w-full px-10">
                {errors.bedrooms.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between px-10 w-full gap-2 ">
              <h2>Suítes</h2>
              <select className="w-1/2 outline-none " {...register("suite")}>
                <option value=""></option>
                {suites?.map((name: String, index: number) => (
                  <option
                    key={index}
                    className="text-left pl-2 py-2"
                    value={name as string}
                  >
                    Suítes {name}
                  </option>
                ))}
              </select>
            </div>
            {errors.suite && (
              <p className="text-sm text-red-400 text-left w-full px-10">
                {errors.suite.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between px-10 w-full gap-2 ">
              <h2>Garagem</h2>
              <select className="w-1/2 outline-none " {...register("garage")}>
                <option value=""></option>
                {garage?.map((name: String, index: number) => (
                  <option
                    key={index}
                    className="text-left pl-2 py-2"
                    value={name as string}
                  >
                    Vagas {name}
                  </option>
                ))}
              </select>
            </div>
            {errors.garage && (
              <p className="text-sm text-red-400 text-left w-full px-10">
                {errors.garage.message}
              </p>
            )}
          </div>
        </>
      )}

      <div className="flex flex-col items-center justify-between px-10 w-full gap-2 ">
        <h2>Preço</h2>
        <div className="w-full ">
          <select
            className="w-full outline-none "
            {...register("rangePricelow")}
          >
            <option value="">De</option>
            {Lowprices?.map((name: String, index: number) => (
              <option
                key={index}
                className="text-left pl-2 py-2"
                value={name as string}
              >
                R${""} {name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <select
            className="w-full outline-none  "
            {...register("rangePriceHigh")}
          >
            <option value="">Até</option>
            {highPrices?.map((name: String, index: number) => (
              <option key={index} className="" value={name as string}>
                R${""} {name}
              </option>
            ))}
          </select>
        </div>
        {errors.rangePricelow && (
          <p className="text-sm text-red-400 text-left w-full px-10">
            {errors.rangePricelow.message}
          </p>
        )}
      </div>
      <div className="w-full flex items-center justify-center">
        <button
          className="bg-[#302F4D] px-32 py-2 text-white rounded-md"
          type="submit"
        >
          Filtrar
        </button>
      </div>
    </form>
  );
};

export default Filter;
