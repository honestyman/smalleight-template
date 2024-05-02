import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from '../img/black_logo.webp';

// import Header from "../../component/Header";

import { useNavigate } from "react-router-dom";
// import 'intersection-observer';
import { SlLogin } from "react-icons/sl";
import { getAuth } from "../redux/slice/authSlice";

// import HeaderDashBoard from "../HeaderDashBoard";


const Login=()=>{

  const navigate= useNavigate();
  const dispatch = useDispatch();

  const [disabled, setDisabled]=useState(true);
  const [adminName, setAdminName]=useState("");
  const [password, setPassword]=useState("");
  const {authtoken} = useSelector(state => state.auth);

  useEffect( () => {
    const token = localStorage.getItem('token');
    if(token){
      navigate("/manage");
    }
  }, []);
  // useEffect(() => {
    
  // }, [authtoken]);
  
  useEffect(() => {
      if(adminName && password){
        setDisabled(false);
      }else{
        setDisabled(true);
      }
    }, [adminName, password]);
  const handleClick=()=>{
    console.log(adminName, password);
    const payload={
      adminName: adminName,
      password: password
    }
    dispatch(getAuth(payload));
    if(authtoken.token){
      localStorage.setItem('token', authtoken.token);
      navigate("/manage");
    }else{
      alert("管理者名とパスワードを正確に入力してください。")
    }
  }

  return(
    <div tw="w-full h-full flex flex-col">
      <div tw="w-[600px] rounded-xl pt-10 mx-auto my-40">
        <img src={logo} tw="w-[50%] mx-auto"  />
        <div tw="w-full px-20 py-20">
          <div tw="w-full mb-10">
            <div tw='w-full flex justify-between'>
              <label>管理者名</label>
              <label tw='bg-[#FB2407] text-white rounded px-1 mx-1'>必須</label>
            </div>
            <input tw="shadow appearance-none border border-red-500 rounded w-full mt-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={adminName} id="name" type="text" onChange={(e)=>setAdminName(e.target.value)}/>
          </div>
          <div tw="w-full mb-10">
            <div tw='w-full flex justify-between'>
              <label>パスワード</label>
              <label tw='bg-[#FB2407] text-white rounded px-1 mx-1'>必須</label>
            </div>
            <input tw="shadow appearance-none border border-red-500 rounded w-full mt-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={password} id="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div tw="w-full flex justify-center pt-5">
            <button disabled={disabled} tw="flex items-center text-white border-2 rounded-md px-10 mx-10 mx-2 px-2 py-1 bg-[#B40100] hover:bg-white hover:text-[#B40100]" onClick={handleClick}><SlLogin tw="mx-1"/>ログイン</button>
          </div>
        </div>

      </div>
    </div>
  );
  
};
export default Login;