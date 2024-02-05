"use client"
import { useState } from "react";

const OrderId = ({ params }: { params: { id: string } }) => {
     const [valueStatus, setvalueStatus] = useState("")
     const [ idMail, setIdMail] = useState("")
      const handlePutOrder = ()=>{
        if(valueStatus === "enviado" && idMail === ""){
            alert("Insira o numero do rastreamento para o cliente")
        }
        alert("Ordem de serviço atualizada com sucesso!")
      }
    return ( 
    <section className="w-full h-full py-10 px-4">
          <div className="w-full h-full">
              <h1>Produtos ordem pedido 01</h1>
              <div className="w-full h-full">
                <div className="w-full grid grid-cols-6 gap-4">
                    <div className="p-1">
                    <img src="/2.png" alt="Revista" />
                     <p>Revista Nome</p>
                     <p>Ediçao</p>
                    </div>
                    <div>
                    <img src="/2.png" alt="Revista" />
                    <p>Revista Nome</p>
                     <p>Ediçao</p>
                    </div>
                    <div>
                    <img src="/2.png" alt="Revista" />
                    <p>Revista Nome</p>
                     <p>Ediçao</p>
                    </div>
                    <div>
                    <img src="/2.png" alt="Revista" />
                    <p>Revista Nome</p>
                     <p>Ediçao</p>
                    </div>
                    <div>
                    <img src="/2.png" alt="Revista" />
                    <p>Revista Nome</p>
                     <p>Ediçao</p>
                    </div>
                    <div>
                    <img src="/2.png" alt="Revista" />
                    <p>Revista Nome</p>
                     <p>Ediçao</p>
                    </div>
                    <div>
                    <img src="/2.png" alt="Revista" />
                    <p>Revista Nome</p>
                     <p>Ediçao</p>
                    </div>
                 
                    <div>
                    <img src="/2.png" alt="Revista" />
                    <p>Revista Nome</p>
                     <p>Ediçao</p>
                    </div>
                  
                </div>
              </div>
              <h1>Detalhes do Pedido</h1>
              <div className="flex gap-1 bg-gray-300 py-4 rounded-md px-2">
              <div className="w-[50%] h-full flex flex-col items-center justify-start gap-2">
               
               <div className="w-full flex gap-2">
                 <p>Nome</p>
                 <p>Leonardo Paiva</p>
               </div>
               <div className="w-full flex gap-2">
                 <p>E-mail</p>
                 <p>leonardopaiva@gmail.com</p>
               </div>
               <div className="w-full flex gap-2">
                 <p>Telefone</p>
                 <p>55 9999-999-999</p>
               </div>
              </div>
              <div className="w-[50%] h-full flex flex-col items-center justify-start gap-2">
               
               <div className="w-full flex gap-1">
                 <p>Endereço</p>
                 <p>Rua dos desejos 389</p>
               </div>
               <div className="w-full flex gap-1">
                 <p>Cidade</p>
                 <p>Blumenau</p>
               </div>
               <div className="w-full flex gap-1">
                 <p>Bairro</p>
                 <p>Floresta / RS</p>
               </div>
               <div className="w-full flex gap-1">
                 <p>Qtd</p>
                 <p>8 items</p>
               </div>
               <div className="w-full flex gap-1">
                 <p>Valor</p>
                 <p>R$ 1065,00</p>
               </div>
               <div className="w-full flex gap-1">
                 <p>Status</p>
                 <select value={valueStatus} onChange={(e)=>setvalueStatus(e.target.value)} className="outline-none rounded-md">
                    <option value="andamento">Em andamento</option>
                    <option value="enviado">Enviado</option>
                    <option value="recebido">Recebido</option>
                    <option value="cancelado">Cancelar</option>
                    <option value="retirado">Retirado</option>
                 </select>
               </div>
               <div className="w-full flex flex-col gap-1">
                 <label htmlFor="">Inserir codigo de rastreamento</label>
                 <input value={idMail} onChange={(e)=>setIdMail(e.target.value)} type="text" className="w-[80%] py-2 rounded-md  pl-4 outline-none" placeholder="Id de rastreamento" />
               </div>

              </div>
              </div>
          </div>
          <div className="w-full flex items-center justify-center py-4">
            <button onClick={handlePutOrder} className="w-40 bg-black text-white rounded-md py-2">Atualizar Ordem</button>
          </div>
    </section> 
    );
}
 
export default OrderId;