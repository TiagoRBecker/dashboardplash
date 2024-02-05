"use client";
import Header from "@/components/Header";
import { Houses } from "@/components/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";


const Dashboard = () => {
  const [houses, setHouses] = useState<Houses[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getHouses();
  }, []);
  // Funçao que busca todas as houses
  const getHouses = async () => {
    const get = await fetch("http://localhost:5000/houses", {
      method: "GET",
    });

    const res = await get.json();
    setHouses(res);
    setLoading(false);
    return;
  };
  //Função que busca as hoouses de acordo com a busca , cidade , bairro 
  const searchData = () => {
    console.log("ok");
  };
  // Exibe o loading  enquanto carrega os dados
  if (loading) {
    return (
      <section className="w-full h-screen flex flex-col items-center justify-center px-4 ">
        <Spinner />
        <p className="text-[#333] text-base">Carregando...</p>
      </section>
    );
  }
  return (
    <section className="w-full h-full py-3">
      <Header search={searchData} />
      <div className="w-[80%] h-full grid grid-cols-2 gap-4 mx-auto ">
        {houses?.map((house: Houses, index: number) => (
          <div className="w-full h-full " key={index}>
            <Link href={`/dashboard/imoveis/${house.id}`}>
              <div className="w-full h-full relative">
                <img
                  src={house.images[0]}
                  alt={house.name}
                  className="w-full h-full brightness-75"
                />

                <span className="text-white top-2 left-2 absolute font-bold bg-black bg-opacity-50 px-3 py-1 rounded-md text-sm">
                  {house.city}
                </span>
                <span className="text-white top-2 right-2 absolute font-bold bg-black bg-opacity-50 px-3 py-1 rounded-md text-sm">
                  {house.district}
                </span>
                <p className="text-white text-lg absolute top-[50%] flex items-center justify-center font-bold uppercase w-full  ">
                  {house.categories?.name}
                </p>
                <div className="w-full flex absolute top-[62%]  items-center justify-center gap-10 ">
                  <div className="flex flex-col items-center gap-1">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="compress-arrows-alt"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        fill="currentColor"
                        d="M200 288H88c-21.4 0-32.1 25.8-17 41l32.9 31-99.2 99.3c-6.2 6.2-6.2 16.4 0 22.6l25.4 25.4c6.2 6.2 16.4 6.2 22.6 0L152 408l31.1 33c15.1 15.1 40.9 4.4 40.9-17V312c0-13.3-10.7-24-24-24zm112-64h112c21.4 0 32.1-25.9 17-41l-33-31 99.3-99.3c6.2-6.2 6.2-16.4 0-22.6L481.9 4.7c-6.2-6.2-16.4-6.2-22.6 0L360 104l-31.1-33C313.8 55.9 288 66.6 288 88v112c0 13.3 10.7 24 24 24zm96 136l33-31.1c15.1-15.1 4.4-40.9-17-40.9H312c-13.3 0-24 10.7-24 24v112c0 21.4 25.9 32.1 41 17l31-32.9 99.3 99.3c6.2 6.2 16.4 6.2 22.6 0l25.4-25.4c6.2-6.2 6.2-16.4 0-22.6L408 360zM183 71.1L152 104 52.7 4.7c-6.2-6.2-16.4-6.2-22.6 0L4.7 30.1c-6.2 6.2-6.2 16.4 0 22.6L104 152l-33 31.1C55.9 198.2 66.6 224 88 224h112c13.3 0 24-10.7 24-24V88c0-21.3-25.9-32-41-16.9z"
                      ></path>
                    </svg>
                    <p className="w-full text-white text-lg font-bold text-center">
                      {house.meters}
                    </p>
                  </div>
                  {house.bedrooms > "0" && (
                    <div className="flex flex-col items-center gap-1">
                      <svg
                        data-v-52ac1490=""
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="bed"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                        className="w-6 h-6 text-white"
                      >
                        <path
                          data-v-52ac1490=""
                          fill="currentColor"
                          d="M176 256c44.11 0 80-35.89 80-80s-35.89-80-80-80-80 35.89-80 80 35.89 80 80 80zm352-128H304c-8.84 0-16 7.16-16 16v144H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v352c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-48h512v48c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V240c0-61.86-50.14-112-112-112z"
                        ></path>
                      </svg>
                      <p className="w-full text-white text-lg font-bold text-center">
                        {house.bedrooms}
                      </p>
                    </div>
                  )}

                  {house.suite > "0" && (
                    <div className="flex flex-col items-center gap-1">
                      <svg
                        data-v-52ac1490=""
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="door-open"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                        className="w-6 h-6 text-white"
                      >
                        <path
                          data-v-52ac1490=""
                          fill="currentColor"
                          d="M624 448h-80V113.45C544 86.19 522.47 64 496 64H384v64h96v384h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM312.24 1.01l-192 49.74C105.99 54.44 96 67.7 96 82.92V448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h336V33.18c0-21.58-19.56-37.41-39.76-32.17zM264 288c-13.25 0-24-14.33-24-32s10.75-32 24-32 24 14.33 24 32-10.75 32-24 32z"
                        ></path>
                      </svg>
                      <p className="w-full text-white text-lg font-bold text-center">
                        {house.suite}
                      </p>
                    </div>
                  )}

                  {house.garage > "0" && (
                    <div className="flex flex-col items-center gap-1">
                      <svg
                        data-v-52ac1490=""
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="car"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-6 h-6 text-white"
                      >
                        <path
                          data-v-52ac1490=""
                          fill="currentColor"
                          d="M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z"
                        ></path>
                      </svg>
                      <p className="w-full text-white text-lg font-bold text-center">
                        {house.garage}
                      </p>
                    </div>
                  )}
                </div>

                <span className="text-white absolute top-[88%] w-full flex items-center justify-center">
                  R${" "}
                  {house.price.toLocaleString("pt-br", {
                    styled: "currency",
                    currency: "BRL",
                  } as any)}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
