"use client"
import {getCookies} from "../utils/cookies"
import { useEffect, useState } from "react";
type User = {
  name:string,
  email:string,
  role:string,
  avatar:string
}
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
const Header = ({search,value,onChange, placeholder,handleMenu}:any) => {
   const [ user, setUser] = useState<User>()
  
  return (
    <div className="w-full h-[70px] flex items-center justify-between px-6 bg-white ">
       
      <div className="w-[40%] flex items-center gap-2">
        <input
        value={value}
        onChange={onChange}
          type="search"
          className="w-2/3 h-9 outline-none border-[1px] border-gray-300 rounded-md pl-4 px-4 "
          placeholder={placeholder}
        />
        <div className="bg-[#005183] w-12 h-9 rounded-md flex items-center justify-center" onClick={search}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6  text-white cursor-pointer "
          
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        </div>
        
      </div>
      <div className="w-[30%] h-full flex items-center gap-2">
      <Avatar name='Leonardo Paiva' src='/user.png'  />
      <p>Leonardo Paiva</p>
      </div>
     
    </div>
  );
};

export default Header;
