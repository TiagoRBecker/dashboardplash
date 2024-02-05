"use client"

import Spinner from "@/components/Spinner";
import { baseURL } from "@/components/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DvlID = ({ params }: { params: { slug: string } }) => {
     const router = useRouter()
     const slug = params.slug
    useEffect(()=>{getDVLName()},[])
    const [ dvl , setDvl] = useState([])
     const [pay ,setPay] = useState ('')
     const [loading,setLoading] = useState(true)
    const getDVLName = async ()=>{
        const getDvl = await fetch(`${baseURL}/dvl/${slug}`,{
            method:"GET"
        })
         const response = await getDvl.json()
         setDvl(response)
         setLoading(false)
         return 
    }
     const updateDvl = async (e:any)=>{
        e.preventDefault()
        const checkInput = dvl.some((items:any)=> Number(items.paidOut) < Number(pay))
        if(checkInput){
            alert("Erro, o valor  inserido e mair do que tem que ser pago.")
            return
        }
        const update = await fetch(`${baseURL}/user/${slug}`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
              },
            body:JSON.stringify({dvl,pay})
        })
         if(update.status === 200){
            const response = await update.json()
            alert(`Numero de usuario que foi atualizado o dvl ${response.count}`)
            router.push("/dashboard/dvl")
            return
         }
        return 
     }
      console.log(dvl)
     if(loading){
        return(
            <section className="w-full h-screen py-10 flex items-center justify-center">
                <Spinner/>
            </section>
        )
     }
    return (
    <section className="w-full h-screen py-10 flex items-center justify-center flex-col">
        <div className="w-full">
         {
            dvl?.map((items:any,index)=>(
                <div className="flex w-[40%] gap-3 mx-auto">
                <div className="w-[50%]">
                    <img src="/vol2.png" alt="" className="w-44 h-44" />
                 </div>
                 <div className="w-[50%] flex flex-col gap-3">
                   <h1>{items?.name}</h1>
                   <span>Total do DVL {Number(items.price).toLocaleString("pt-br",{style:"currency",currency:"BRL"})}</span>
                   <span>Recebido {Number(items.toReceive).toLocaleString("pt-br",{style:"currency",currency:"BRL"})}</span>
                   <span>Pagar {Number(items.paidOut).toLocaleString("pt-br",{style:"currency",currency:"BRL"})}</span>
                </div>
                </div>

            ))
         }
         <form className="flex flex-col   w-[40%] gap-3 mx-auto mt-10" onSubmit={updateDvl}>
            <div className="w-full flex flex-col gap-2">
            <label htmlFor="">Pagar Valor </label>
            <input 
            value={pay}
            onChange={(e)=>setPay(e.target.value)}
            type="number" placeholder="Insira o valor a ser debitado do dvl" className="w-full border-[1px] outline-none border-gray-300 py-4 pl-2 rounded-md"/>
            </div>
            <button className="px-4 py-2 bg-[#14b7a1]  rounded-md text-white">
                Pagar
              </button>
         </form>
         </div>
    </section> );
}
 
export default DvlID;