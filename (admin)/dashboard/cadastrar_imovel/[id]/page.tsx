"use client";
import Spinner from "@/components/Spinner";
import { getCookies } from "@/components/utils/cookies";
import { Houses, houses } from "@/components/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const EditImovel = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  //state para armazenar as categorias
  const [categories, setCategories] = useState<any>([]);
  //state para armazenar a categoria selecionada

  // //state para armazenar as imagens
  const [images, setImages] = useState<any>([]);
  //state que faz o loading para uma melhor experencia para usuario
  const [loading, setLoading] = useState(true);
  //state para armazenar o index que a imagem esta
  const [currentIndex, setCurrentIndex] = useState(0);
  //Ao montar o component ja exibe as categorias
  useEffect(() => {
    getHouseId();
    getCategories();
  }, []);

  //React Hook forms
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Houses>({
    mode: "all",
    resolver: zodResolver(houses),
  });
   console.log(errors)
  //Funçao que busca casa pelo ID
  const getHouseId = async () => {
    const token = await getCookies();
    try {
      const get = await fetch(`http://localhost:5000/houses/${params.id}`, {
        method: "GET",
      });
      const data = await get.json();
      setImages(data?.images);
      setValue("city", data.city);
      setValue("district", data.district);
      setValue("UF", data.UF);
      setValue("address", data.address);
      setValue("meters", data.meters);
      setValue("suite", data.suite);
      setValue("bedrooms", data.bedrooms);
      setValue("price", data.price);
      setValue("garage", data.garage);
      setValue("descript", data.descript);
      setLoading(false);
    }  catch (error) {
        //Exibe o erro de forma amigavel na tela
        console.log(error);

        await Swal.fire(
          "Erro no servidor tente novamente mais tarde!",
          "Clica no botão para continuar!",
          "error"
        );
      }
  };
  // Funçao que envia os dados para o backend
  const onSubmit = handleSubmit(async (data) => {
    const id = params.id;
    const formData = { ...data, images, id };

    //Lib para questionar se deseja cadastrar novo usuario
    const edit = await Swal.fire({
      position: "center",
      title: "Tem certeza?",
      text: `Você deseja editar o imóvel?`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d55",
      confirmButtonText: "Adicionar",
      confirmButtonColor: "#00FF00",
    });
    //Caso seja true envia os dados e cadastra o novo usuario
    if (edit.isConfirmed) {
      try {
        //deleta a categoria e apos exibe  um modal Categoria deletada com sucesso!
        const editImovel = await fetch("http://localhost:5000/update-house", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        await Swal.fire(
          "Imóvel editado com sucesso!",
          "Clica no botão para continuar!",
          "success"
        );
        router.push("/dashboard/cadastrar_imovel");
        return;
      } catch (error) {
        //Exibe o erro de forma amigavel na tela
        console.log(error);

        await Swal.fire(
          "Erro no servidor tente novamente mais tarde!",
          "Clica no botão para continuar!",
          "error"
        );
      }
    }
  });

  //Busca as categorias
  const getCategories = async () => {
    const getCat = await fetch("http://localhost:5000/categories", {
      method: "GET",
    });
    const response = await getCat.json();
    setCategories(response);
    return;
  };
  //Faz o envio das imagens para backend
  const upload = async (e: any) => {
    const files = e.target?.files;
    //Caso passe de 4 imagens emite um alerta que nao e possivel enviar  mais para oo backend
    if (images.length >= 4) {
      const addImages = await Swal.fire({
        position: "center",
        title: "Limite de cadastro de imagens!",
        text: `Você atingiu o limite maximo de imagens permitido!`,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#d55",
        confirmButtonText: "Aceitar",
        confirmButtonColor: "#00FF00",
      });
      if (addImages.isConfirmed) {
        return;
      }
    } else {
      const data = new FormData();
      for (const file of files) {
        setLoading(true);
        data.append("file", file);

        const uploadFiles = await fetch("http://localhost:5000/files-imovel", {
          method: "POST",

          body: data,
        });
        if (uploadFiles.status === 200) {
          const res = await uploadFiles.json();

          setImages((prev: any) => [...prev, ...res] as any);

          setLoading(false);
          return;
        }
      }
    }
  };
  //Altera a imagem no painel
  const handleImage = (index: number) => {
    setCurrentIndex(index);
  };
  // Limpa todas as imagens
  const clearImages = async () => {
    setImages([]);
  };
  if (loading) {
    return (
      <section className="w-full h-screen flex flex-col items-center justify-center px-4 ">
        <Spinner />
        <p className="text-[#333] text-base">Carregando...</p>
      </section>
    );
  }
  return (
    <section className="w-full h-full  px-4 py-3">
      <form
        className=""
        method="POST"
        onSubmit={onSubmit}
        encType="multipart/form-data"
      >
        <h1 className="text-xl text-gray-400 text-center w-full font-bold uppercase py-4">
          Editar Imóvel
        </h1>
        <div className="grid grid-cols-2">
          <div className="w-full px-4">
            <div className="flex w-full gap-2 items-center">
              <div className="w-[80%] flex flex-col gap-2">
                <label htmlFor="" className="text-[#005183] font-bold">
                  Cidade
                </label>
                <input
                  {...register("city")}
                  type="text"
                  placeholder="Insira o nome da Cidade"
                  className="outline-none border-[1px] border-gray-400 rounded-md pl-2 h-9"
                />
                {errors.city && (
                  <p className="text-base text-red-400">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div className="w-[20%] flex flex-col gap-2">
                <label htmlFor="" className="text-[#005183] font-bold">
                  UF
                </label>
                <input
                  {...register("UF")}
                  type="text"
                  placeholder="Estado"
                  className="outline-none border-[1px] border-gray-400 rounded-md pl-2 h-9"
                />
                {errors.UF && (
                  <p className="text-base text-red-400">{errors.UF.message}</p>
                )}
              </div>
            </div>
            <div className="flex w-full gap-2 items-center">
              <div className="flex flex-col gap-2 w-[60%]">
                <label htmlFor="" className="text-[#005183] font-bold">
                  Endereço
                </label>
                <input
                  {...register("address")}
                  type="text"
                  placeholder="Insira o endereço do Imóvel"
                  className="outline-none border-[1px] border-gray-400 rounded-md pl-2 h-9"
                />
                {errors.address && (
                  <p className="text-base text-red-400">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 w-[40%]">
                <label htmlFor="" className="text-[#005183] font-bold">
                  Bairro
                </label>
                <input
                  {...register("district")}
                  type="text"
                  placeholder="Bairro"
                  className="outline-none border-[1px] border-gray-400 rounded-md pl-2 h-9"
                />
                {errors.district && (
                  <p className="text-base text-red-400">
                    {errors.district.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-[#005183] font-bold">
                Metros²
              </label>
              <input
                {...register("meters")}
                type="text"
                placeholder="Insira a metragem do Imóvel"
                className="outline-none border-[1px] border-gray-400 rounded-md pl-2 h-9"
              />
              {errors.meters && (
                <p className="text-base text-red-400">
                  {errors.meters.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-[#005183] font-bold">
                Suítes
              </label>
              <input
                {...register("suite")}
                type="text"
                placeholder="Insira o numero de Suítes"
                className="outline-none border-[1px] border-gray-400 rounded-md pl-2 h-9"
              />
              {errors.suite && (
                <p className="text-base text-red-400">{errors.suite.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-[#005183] font-bold">
                Dormitórios
              </label>
              <input
                {...register("bedrooms")}
                type="text"
                placeholder="Insira o numero de Dormitórios"
                className="outline-none border-[1px] border-gray-400 rounded-md pl-2 h-9"
              />
              {errors.bedrooms && (
                <p className="text-base text-red-400">
                  {errors.bedrooms.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-[#005183] font-bold">
                Preço
              </label>
              <input
                {...register("price")}
                type="text"
                placeholder="Insira o preço do imóvel"
                className="outline-none border-[1px] border-gray-400 rounded-md pl-2 h-9"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-[#005183] font-bold">
                Garagem
              </label>
              <input
                {...register("garage")}
                type="text"
                placeholder="Insira o numero de vagas na garagrem "
                className="outline-none border-[1px] border-gray-400 rounded-md pl-2 h-9"
              />
              {errors.garage && (
                <p className="text-base text-red-400">
                  {errors.garage.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <h1 className="text-[#005183] font-bold">Categoria</h1>
              <select
                className="w-full outline-none border-[1px] border-gray-400 rounded-md pl-2 h-9"
                {...register("categories")}
              >
                <option value={""}>Selecione uma categoria</option>
                {categories?.map((categorie: any, index: number) => (
                  <option key={index} value={categorie.id}>
                    {categorie.name}
                  </option>
                ))}
              </select>
              {errors.categories && (
                <p className="text-base text-red-400">
                  {errors.categories.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full  px-4">
            <div className="w-full h-[50%]  flex items-center   border-[1px] border-gray-400 rounded-md  flex-wrap">
              {loading ? (
                <p className="flex items-center justify-center w-full">
                  {" "}
                  <Spinner />
                </p>
              ) : (
                <>
                  {images?.length > 0 ? (
                    <img
                      src={images[currentIndex]}
                      alt=""
                      className="w-full h-48  object-contain rounded-md"
                    />
                  ) : (
                    <label
                      htmlFor="fileInput"
                      className=" flex items-center justify-center w-full cursor-pointer text-[#005183]"
                    >
                      Selecione suas imagens , maximo de 4 imagem.
                    </label>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center py-2">
              <div className="w-[80%] h-full flex items-center">
                <div className="flex items-center gap-2">
                  {images?.map((link: string, index: number) => (
                    <img
                      key={index}
                      src={link}
                      alt=""
                      className="w-10 h-10 object-cover cursor-pointer"
                      onClick={() => handleImage(index)}
                    />
                  ))}
                </div>
              </div>
              <div className="w-[20%] flex gap-2">
                <input
                  id="fileInput"
                  type="file"
                  onChange={upload}
                  hidden
                  accept=".jpg, .jpeg, .png"
                />
                <label htmlFor="fileInput" className="cursor-pointer ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                    />
                  </svg>
                </label>
                <label htmlFor="">
                  <svg
                    onClick={clearImages}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-red-600 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </label>
              </div>
            </div>

            <div className="w-full h-full mt-4 flex flex-col">
              <label htmlFor="" className="text-[#005183] font-bold">
                Descrição do imóvel
              </label>
              <textarea
                {...register("descript")}
                placeholder="Digite a descriçao"
                className="w-full h-full outline-none border-[1px] border-gray-400 rounded-md pl-2 resize-none"
              ></textarea>
              {errors.descript && (
                <p className="text-base text-red-400">
                  {errors.descript.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-4">
          <button
            type="submit"
            className="w-[50%] px-4 py-2 mx-auto bg-[#005183] text-white"
          >
            Editar
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditImovel;
