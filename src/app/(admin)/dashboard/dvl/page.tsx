"use client";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { baseURL } from "@/components/utils/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Progress,
} from "@chakra-ui/react";
const Dvl = () => {
  useEffect(() => {
    getDvls();
  }, []);
  const [dvl, setDvl] = useState([]);
  const [loading, setLoading] = useState(true);
  const getDvls = async () => {
    const getDvlForPay = await fetch(`${baseURL}/user`, {
      method: "GET",
    });
    const response = await getDvlForPay.json();
    setDvl(response);
    setLoading(false);
  };
  const searchData = () => {};
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
      <div className="w-full">
        
        <TableContainer width={"100%"}>
          <Table variant="simple">
            <TableCaption>DVLS á pagar</TableCaption>
            <Thead background={"#14b7a1"}>
              <Tr>
                <Th color={"white"}>Nome</Th>
                <Th color={"white"}>%</Th>
                <Th color={"white"}>Receber</Th>
                <Th color={"white"}>Pago</Th>
                <Th color={"white"}>Status</Th>
                <Th color={"white"}>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dvl?.map((dvl: any, index: number) => (
                <Tr>
                  <Td>{dvl.name}</Td>
                  <Td>
                    <Progress
                      colorScheme="green"
                      value={
                        Number(dvl.price) === Number(dvl.toReceive)
                          ? 100
                          : dvl.paidOut
                      }
                    />
                  </Td>
                  <Td>
                   
                      {Number(dvl.paidOut).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Td>
                  <Td>
                  {Number(dvl.toReceive).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Td>
                  <Td>
                  {dvl.toReceive === dvl.price ? (
                    <p className="text-red-500">Finalizado</p>
                  ) : (
                    <p className="text-green-500">Ativo</p>
                  )}
                  </Td>
                  <Td>
                  {dvl.toReceive === dvl.price ? (
                    <p className="text-green-500">Pago</p>
                  ) : (
                    <Link href={`/dashboard/dvl/${dvl.name}`}>
                    <button className="text-[#005183]">Pagar</button>
                  </Link>
                  )}
                  
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default Dvl;
