"use client";
import { User, user } from "@/components/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import {getCookies} from "@/components/utils/cookies";
const EditEmploye = ({ params }: { params: { slug: string } }) => {
  const [avatar, setAvatar] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const slug = params.slug;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<User>({
    mode: "all",
    resolver: zodResolver(user),
  });

  useEffect(() => {
    getUserId();
  }, []);
  const getUserId = async () => {
     const token = await getCookies()
    const get = await fetch(`http://localhost:5000/users/${slug}`, {
      method: "GET",
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    const data = await get.json();
    
     setAvatar(data.avatar)
    //Funçao para setar os values que vem  do banco de dados
    //setValue("inputname", data.name..)
    Object.entries(data).forEach(([key, value]: any) => {
      setValue(key as keyof User, value);
    });
  };
 //Funçao caso usuario queira trocar a foto 
  const upload = async (e: any) => {
    setLoading(true);
    const formdate = new FormData();
    formdate.append("file", e.target.files[0]);
    const upload = await fetch("http://localhost:5000/perfil", {
      method: "POST",
      body: formdate,
    });
    if (upload.status === 200) {
      const file = await upload.json();
      setAvatar(file.file);
      setLoading(false);
      return;
    }
  };
 //Funçao que envia os dados para backend
  const onSubmit = handleSubmit(async (data) => {
    const formData = {...data,slug,avatar}

    //Lib que faz o visual para cliente , questiona se ele realmente quer mudar os dados
    const edit = await Swal.fire({
      position: "center",
      title: "Tem certeza?",
      text: `Você deseja alterar o colaborador ${data.name}?`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d55",
      confirmButtonText: "Adicionar",
      confirmButtonColor: "#00FF00",
    });
    //Caso  a funçao acima seja true , os dados sao enviados para backend 
    if (edit.isConfirmed) {
      try {
        //deleta a categoria e apos exibe  um modal Categoria deletada com sucesso!
        const addCat = await fetch(`http://localhost:5000/user-update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        await Swal.fire(
          "Usuário editado com sucesso!",
          "Clica no botão para continuar!",
          "success"
        );
        router.push("/dashboard/colaboradores");
      } catch (error) {
        //Caso de erro exibe o erro de forma amigavel na tela
        console.log(error);
        //Exibe o modal de erro caso exista um
        await Swal.fire(
          "Erro ao editar o usuário!",
          "Clica no botão para continuar!",
          "error"
        );
      }
    }
  });

  return (
    <section className="flex w-full h-full items-center justify-center">
       <div className="w-1/2  flex flex-col items-center justify-center gap-2">
        {loading ? (
          <p>Carregando aguarde...</p>
        ) : (
          <>
            <img
              src={avatar ? avatar : "/user.png"}
              alt="Perfil"
              className="w-40 h-40 object-cover rounded-full"
            />
            <input id="file" type="file" hidden onChange={upload} />
            <label
              className="cursor-pointer bg-[#005183] px-4 text-white py-2 rounded-md"
              htmlFor="file"
            >
              Carregar Imagem
            </label>
          </>
        )}
      </div>
      <div className="flex-grow ">
        <form
          onSubmit={onSubmit}
          className="w-full h-full flex flex-col items-center justify-center mx-auto px-5"
        >
          <h1 className="text-xl font-bold uppercase text-[#005183]">
            Adiconar Colaborador
          </h1>
          <div className="flex flex-col w-full">
            <label htmlFor="" className="text-lg text-gray-400">
              Nome
            </label>
            <input
              {...register("name")}
              type="text"
              className="w-full outline-none border-[1px] border-gray-400 rounded-md pl-2 py-2"
              placeholder="Digite o nome"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="" className="text-lg text-gray-400">
              Email
            </label>
            <input
              {...register("email")}
              type="text"
              className="w-full outline-none border-[1px] border-gray-400 rounded-md pl-2 py-2"
              placeholder="Digite o email"
            />
          </div>
          <div className="w-full flex gap-2">
            <div className="w-[70%] flex flex-col">
              <label htmlFor="" className="text-lg text-gray-400">
                Creci
              </label>
              <input
                {...register("creci")}
                type="text"
                className="w-full outline-none border-[1px] border-gray-400 rounded-md pl-2 py-2"
                placeholder="Digite o creci"
              />
            </div>
            <div className="w-[30%] flex flex-col">
              <label htmlFor="" className="text-lg text-gray-400">
                UF
              </label>
              <input
                {...register("creciUF")}
                type="text"
                className="w-full outline-none border-[1px] border-gray-400 rounded-md pl-2 py-2"
                placeholder="Estado"
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="" className="text-lg text-gray-400">
              Telefone
            </label>
            <input
              {...register("phone")}
              type="text"
              className="w-full outline-none border-[1px] border-gray-400 rounded-md pl-2 py-2"
              placeholder="Digite o telefone"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="" className="text-lg text-gray-400">
              Cargo
            </label>
            <select
              {...register("role")}
              className="w-full outline-none border-[1px] border-gray-400 rounded-md pl-2 py-2"
            >
              <option value="ADMIN">Administrador</option>
              <option value="USER">Colaborador</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="" className="text-lg text-gray-400">
              Senha
            </label>
            <input
              {...register("password")}
              type="text"
              className="w-full outline-none border-[1px] border-gray-400 rounded-md pl-2 py-2"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#005183] rounded-md text-white mt-4"
          >
            Editar Colaborador
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditEmploye;
