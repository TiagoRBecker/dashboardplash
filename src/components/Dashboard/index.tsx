"use client";
import Link from "next/link";
import { menuLinks } from "../Mock";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie, getCookies } from "../utils/cookies";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

import { useState } from "react";
const Dash = ({onClose}:any) => {
  const [showMenu, setShowMenu] = useState(true);
  const router = useRouter();
  const path = usePathname();
  const handleLogout = async () => {
    const token = await getCookies();
    if (token) {
      deleteCookie();
      router.push("/auth");
      return;
    }
  };

  const openMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="w-full h-full">
     
       
    
      <nav className="w-full h-full flex flex-col gap-2">
       
        <Accordion defaultIndex={[0]} allowMultiple border={0}>
          {menuLinks.map((links, index) => (
            <AccordionItem border={"none"} key={index} color={"white"} pb={4} >
              <h2>
                <AccordionButton >
                  <Box
                    as="span"
                    display="flex"
                    gap="3"
                    flex="1"
                    textAlign="left"
                    color={"white"}
                  >
                    {links.icon} {links.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton >
                {links.links.map((link, index) => (
                  <AccordionPanel pb={4} pl={14} key={index} color={"white"} onClick={onClose}>
                    <Link href={link.path}>{link.name}</Link>
                  </AccordionPanel>
                ))}
              </h2>
            </AccordionItem>
          ))}
        </Accordion>
      </nav>
    </div>
  );
};

export default Dash;
