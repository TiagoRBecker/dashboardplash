"use client";
import { User, user } from "@/components/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {  useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";


const AddEmployee = () => {
  const router = useRouter();
  const [avatar, setAvatar] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<User>({
    mode: "all",
    resolver: zodResolver(user),
  });
 //Funçao de upload que faz o envio da imagem para backend
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
  //Funçao que carrega os dados para backend
  const onSubmit = handleSubmit(async (data) => {
    const formData = { ...data, avatar};
    //Lib para questionar se deseja cadastrar novo usuario
    const Add = await Swal.fire({
      position: "center",
      title: "Tem certeza?",
      text: `Você deseja criar o colaborador ${data.name}?`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d55",
      confirmButtonText: "Adicionar",
      confirmButtonColor: "#00FF00",
    });
    //Caso seja true envia os dados e cadastra o novo usuario
    if (Add.isConfirmed) {
      try {
        //deleta a categoria e apos exibe  um modal Categoria deletada com sucesso!
        const addEmployee = await fetch(`http://localhost:5000/user-create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData ),
        });

        await Swal.fire(
          "Usuário criado com sucesso!",
          "Clica no botão para continuar!",
          "success"
        );
        router.push("/dashboard/colaboradores");
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

  return (
    <section className="flex w-full h-full items-center justify-center py-4">
      <div className="w-1/2  flex flex-col items-center justify-center gap-2">
        {loading ? (
          <p>Carregando aguarde...</p>
        ) : (
          <>
            <img
              src={avatar ? avatar : "/house.avif"}
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
          encType="multipart/form-data"
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
              accept="image/*"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
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
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
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
              {errors.creci && (
                <p className="text-sm text-red-500">{errors.creci.message}</p>
              )}
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
              {errors.creciUF && (
                <p className="text-sm text-red-500">{errors.creciUF.message}</p>
              )}
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
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="" className="text-lg text-gray-400">
              Cargo
            </label>
            <select
              {...register("role")}
              className="w-full outline-none border-[1px] border-gray-400 rounded-md pl-2 py-2"
            >
              <option value="">Selecionar Cargo</option>
              <option value="ADMIN">Administrador</option>
              <option value="USER">Colaborador</option>
            </select>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
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
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#005183] rounded-md text-white mt-4"
          >
            Adicionar Colaborador
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddEmployee;
