"use client";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { baseURL } from "@/components/utils/api";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
const ArticleHome = () => {
  const [articles, setArticles] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getArticle();
  }, []);

  const searchData = () => {};
  const getArticle = async () => {
    const get = await fetch("http://localhost:5000/articles", {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (get.status === 200) {
      const response = await get.json();
      setArticles(response);
      setLoading(false);
      return;
    }
  };

  const deletArticle = async (id: any, name: any) => {
    const del = await Swal.fire({
      position: "center",
      title: "Tem certeza?",
      text: `Deseja deletar o  Artigo ${name}?`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d55",
      confirmButtonText: "Deletar",
      confirmButtonColor: "#00FF00",
    });

    if (del.isConfirmed) {
      try {
        const deletArticle = await fetch(`${baseURL}/delet-article`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, name }),
        });

        await Swal.fire(
          `Artigo ${name} deletado com sucesso!!`,
          "Clica no botão para continuar!",
          "success"
        );
        await getArticle();
      } catch (error) {
        console.log(error);
        //Exibe o modal de erro caso exista um
        await Swal.fire(
          "Erro ao deletar o artigo!",
          "Clica no botão para continuar!",
          "error"
        );
      }
    }
  };
  if (loading) {
    return (
      <section className="w-full h-screen flex flex-col items-center justify-center px-4 ">
        <Spinner />
      
      </section>
    );
  }
  return (
    <section className="w-full h-full flex  flex-col items-center px-4 gap-4">
      <Header search={searchData} />
      {articles.length === 0 ? (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-gray-400">Nenhum artigo cadastrado!</p>
          <div className="w-full flex items-center justify-center">
            <Link href={"/dashboard/artigos/cadastrar"}>
              <button className="px-4 py-2 bg-[#14b7a1]  rounded-md text-white">
                Adiconar Novo Artigo
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <table className="w-full bg-white ">
            <thead className="bg-[#14b7a1]  text-white">
              <tr>
                <th className="py-2 px-4 text-left"></th>
                <th className="py-2 px-4 text-left">Nome</th>
                <th className="py-2 px-4 text-left">Volume</th>
                <th className="py-2 px-4 text-left">Editora</th>
                <th className="py-2 px-4 text-left">Categoria</th>
                <th className="py-2 px-4 text-left">Preço</th>
                <th className="py-2 px-4 text-left">Açoes</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              {articles &&
                articles?.map((article: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b-[1px] border-gray-300 w-full h-full "
                  >
                    <td className="py-2 px-4">
                      <img
                        src={article.cover as any}
                        alt={article.name}
                        className="w-20 h-20 object-contain"
                      />
                    </td>
                    <td className="py-2 px-4">{article.name}</td>
                    <td className="py-2 px-4 ">{article.volume}</td>
                    <td className="py-2 px-4 ">{article.company}</td>
                    <td className="py-2 px-4 ">{article.Category?.name}</td>
                    <td className="py-2 px-4 ">
                      {Number(article.price)?.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>

                    <td className="py-2 px-4 ">
                      <div className="w-full h-full ">
                        <Link href={`/dashboard/artigos/${article.id}`}>
                          <button className="text-[#005183]">Editar</button>
                        </Link>
                      </div>

                      <button
                        className="text-red-500"
                        onClick={() => {
                          deletArticle(article.id, article?.name);
                        }}
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="w-full flex items-center justify-center mt-4">
            <Link href={"/dashboard/artigos/cadastrar"}>
              <button className="px-4 py-2 bg-[#14b7a1]  rounded-md text-white">
                Adiconar Novo Artigo
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default ArticleHome;
