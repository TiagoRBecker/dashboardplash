"use client";

import { Inter } from "next/font/google";
import Dash from "@/components/Dashboard";

import React, { useState } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Dashboard({ children }: { children: React.ReactNode }) {
  function PlacementExample() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    
    return (
      <>
        
        <Button colorScheme='blue' onClick={onOpen} background={"#14b7a1"} position="fixed">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
        />
      </svg>
        </Button>
        <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent background={"#14b7a1"}>
            <DrawerHeader borderBottomWidth='1px'>
              <Link href={"/dashboard"}>
              <img src="/logo_branco2.png" alt="" className="wa-full h-full object-contain"  onClick={onClose}/>
              </Link>
            </DrawerHeader>
            <DrawerBody>
              <Dash onClose={onClose}/>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  }
  return (
    <>
      <section className="w-full h-full  py ">
        
        <div className="w-full h-full flex">
        <aside className="w-[8%] flex  justify-center py-1 px-1">
           
        {PlacementExample()}
          
          </aside>

          <main className=" w-[91%] min-h-screen  mx-auto  ">
            {children}
          </main>
        </div>
      </section>
    </>
  );
}
