"use client";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { Houses, User } from "@/components/types";
import Link from "next/link";
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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
const Dashboard = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  return (
    <section className="w-full full flex flex-col py-10 gap-10 items-center px-4 ">
      <TableContainer width={"100%"}>
        <Table variant="simple">
          <TableCaption>Ultimos pedidos adicionados</TableCaption>
          <Thead background={"#14b7a1"}>
            <Tr>
              <Th color={"white"}>Nome</Th>
              <Th color={"white"}>Email</Th>
              <Th color={"white"}>Telefone</Th>
              <Th color={"white"}>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Leoardo Paiva</Td>
              <Td>leoanardo@gmail.com</Td>
              <Td>51 999-999-999</Td>
              <Td>Enviado</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

    

      <h1 className="w-full text-left text-lg text-gray-500">
        Dados na base cadastrados
      </h1>
      <div className="w-full    h-full grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <div className="w-full px-4 py-10 flex flex-col md:flex-row md:flex md:items-center md:justify-center gap-4 bg-blue-300  rounded-md text-white">
          <div className="w-full   flex flex-col items-center justify-center gap-2">
            <h1>Colaboradores</h1>
            <p className="w-8 h-8 rounded-full border-[1px] border-white flex items-center justify-center">
              1
            </p>
          </div>
          <div className="w-full items-center justify-center flex">
            <img
              src="/user-interface.png"
              alt="User"
              className="w-11 h-11 object-fill"
            />
          </div>
        </div>
        <div className="w-full px-4 py-10 flex flex-col md:flex-row md:flex md:items-center md:justify-center gap-4 bg-green-600  rounded-md text-white">
          <div className="w-full   flex flex-col items-center justify-center gap-2">
            <h1>Usúarios</h1>
            <p className="w-8 h-8 rounded-full border-[1px] border-white flex items-center justify-center">
              1
            </p>
          </div>
          <div className="w-full items-center justify-center flex">
            <img src="/us.png" alt="User" className="w-11 h-11 object-fill" />
          </div>
        </div>
        <div className="w-full px-4 py-10 flex flex-col md:flex-row md:flex md:items-center md:justify-center gap-4 bg-blue-600  rounded-md text-white">
          <div className="w-full   flex flex-col items-center justify-center gap-2">
            <h1>Revistas</h1>
            <p className="w-8 h-8 rounded-full border-[1px] border-white flex items-center justify-center">
              1
            </p>
          </div>
          <div className="w-full items-center justify-center flex">
            <img src="/book.png" alt="User" className="w-11 h-11 object-fill" />
          </div>
        </div>
        <div className="w-full px-4 py-10 flex flex-col md:flex-row md:flex md:items-center md:justify-center gap-4 bg-green-600  rounded-md text-white">
          <div className="w-full   flex flex-col items-center justify-center gap-2">
            <h1>Artigos</h1>
            <p className="w-8 h-8 rounded-full border-[1px] border-white flex items-center justify-center">
              1
            </p>
          </div>
          <div className="w-full items-center justify-center flex">
            <img
              src="/artigo.png"
              alt="User"
              className="w-11 h-11 object-fill"
            />
          </div>
        </div>
      </div>
       <h1 className="w-full text-left text-lg text-gray-500">Google Analitcs</h1>
      <StatGroup width={"100%"} display="flex" gap={5}>
        <Stat boxShadow={"base"} p={[3,3]}>
   
          <StatLabel>Visitantes</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>

        <Stat  boxShadow={"base"} p={[3,3]}>
          <StatLabel>Clicks</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            9.05%
          </StatHelpText>
        </Stat>
        <Stat  boxShadow={"base"} p={[3,3]}>
          <StatLabel>Dispositivos</StatLabel>
          <StatNumber>30</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            29.05%
          </StatHelpText>
        </Stat>
      </StatGroup>
    </section>
  );
};

export default Dashboard;
