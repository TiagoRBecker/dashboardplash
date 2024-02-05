"use client";

import { useEffect, useState } from "react";
import Button from "../Button";
import { useForm, Controller } from "react-hook-form";
import { icons } from "../Mock";
import { User } from "../types";
import Link from "next/link";

const MyForm = () => {
 
 
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formatPhoneNumber = (input: string) => {
    // Remove caracteres não numéricos
    return input
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };
  const onSubmit = handleSubmit((data) => {
    // Faça algo com os dados submetidos
    console.log(data);
  });


  return (
    <div className="parallax_news ">
      
      <div className="w-full h-full flex flex-col gap-4 items-center justify-center ">
        <h1 className="text-white text-3xl font-semibold py-10">
          Fique por dentro dos nossos lançamentos
        </h1>
        <form method="POST" onSubmit={onSubmit} className="flex gap-2 h-[100px]">
          <div className="flex gap-2 h-full">
            <div className="flex flex-col h-[70px]">
              <div className="w-full h-[35px]">
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Campo obrigatório",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Endereço de e-mail inválido",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      className="h-full pl-2 outline-none rounded-md bg-white"
                      {...field}
                      type="text"
                      placeholder="seu@email"
                    />
                  )}
                />
              </div>
              <div className="h-[30px]">
                {errors.email && (
                  <span className="text-base text-red-500">
                    {errors.email.message as any}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col h-[70px]">
            <div className="w-full h-[35px]">
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Campo obrigatório",
                }}
                render={({ field }) => (
                  <input
                    className="h-full pl-2 outline-none rounded-md bg-white"
                    {...field}
                    type="text"
                    placeholder="Nome"
                  />
                )}
              />
              </div>
              {errors.name && (
                <span className="text-base text-red-500 h-[30px]">
                  {errors.name.message as any}
                </span>
              )}
            </div>

            <div className="flex flex-col h-[70px]">
                <div className="flex flex-col h-[35px]">
              <Controller
                name="phoneNumber"
                control={control}
                rules={{
                  required: "Campo obrigatório",
                }}
                render={({ field }) => (
                  <input
                    className="h-full pl-2 outline-none rounded-md bg-white"
                    {...field}
                    type="text"
                    placeholder="(XX) XXXX-XXXX"
                    onChange={(e) => {
                      const formattedValue = formatPhoneNumber(e.target.value);
                      field.onChange(formattedValue);
                    }}
                  />
                )}
              />
              </div>
              {errors.phoneNumber && (
                <span className="text-base text-red-500 h-[30px]">
                  {errors.phoneNumber.message as any}
                </span>
              )}
            </div>
          </div>
          <div className="flex h-[35px]">
            <Button type="submit" text="Assinar"/>
          </div>
        </form>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-10 py-10">
      <h1 className="text-white text-3xl font-semibold uppercase">Deixe sua Mensagem</h1>
      <form className="mt-3 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          
          <input
            placeholder="Nome"
            className=" border-[1px] border-gray-100  h-10 pl-3 outline-none rounded-md"
            
          />
         
          <input
            
            placeholder="Telefone"
            className=" border-[1px] border-gray-100  h-10 pl-3 outline-none rounded-md"
           
          />
          <input
            
            placeholder="seul@email.com"
            className="border-[1px] border-gray-100  h-10 pl-3 outline-none rounded-md"
           
          />
          <textarea
           
           
            placeholder="Digite sua mensagem "
            className=" border-[1px] border-gray-100 rounded-md w-full h-40 pl-4 resize-none outline-none"
            
          />
        </div>
       
     
        
        <div className="w-full flex items-center justify-center py-4">
        <Button text="ENIVAR"/>
        </div>
        
        
      </form>
       
      </div>
    </div>
  );
};

export default MyForm;
