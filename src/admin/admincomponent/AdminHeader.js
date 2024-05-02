import logo from '../../img/black_logo.webp';
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SlLogout } from "react-icons/sl";

const AdminHeader=()=>{
  const navigate= useNavigate();

  const [changeColor, setChangeColor] = useState(false);

  const clickLogOut = () => {
    localStorage.removeItem('token');
    navigate("/admin");
  }

  return(
    <div tw="w-full h-24 bg-white shadow items-center fixed py-2 z-10">
      <div tw="w-full h-full flex flex-row justify-between py-2">
        <img src={logo} tw=" border border-white rounded-md ml-10" />        
        <div tw="text-center text-black font-bold text-xl flex my-auto mr-10">
          <button onClick={clickLogOut} tw="mx-2 py-2 px-3 flex items-center text-red-500 hover:rounded-md hover:bg-red-500 hover:text-white"><SlLogout tw='mx-1'/>Logout</button>
        </div>
      </div>
    </div>
  );
  
};
export default AdminHeader;