
import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaHome, FaNewspaper, FaTasks, FaTools, FaRegQuestionCircle  } from "react-icons/fa";
import { RiArticleLine } from "react-icons/ri";
import { IoIosPricetags, IoMdTime} from "react-icons/io";
import { MdFeaturedPlayList, MdOutlineMapsHomeWork, MdCampaign   } from "react-icons/md";
import { GiAchievement } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";


const AdminNav=()=>{
  const navigate= useNavigate();

  const [change, setChange] = useState("");
  const [style, setStyle] = useState("");
  
  useEffect(() => {
    // var url = window.location.href;
    var pathname = window.location.pathname;
    setStyle(pathname);
    console.log(pathname);
  }, [change]);

  const [companyblock, setCompanyBlock] = useState('block');
  const [columnblock, setColumnBlock] = useState('block');
  const [newsblock, setNewsBlock] = useState('block');
  
  const changeCompanyBlock = () =>{
    setCompanyBlock(companyblock=="block"?"hidden":"block");
  }
  const changeColumnBlock = () =>{
    setColumnBlock(columnblock=="block"?"hidden":"block");
  }
  // const changeNewsBlock = () =>{
  //   setNewsBlock(newsblock=="block"?"hidden":"block");
  // }
  return(
    <div tw="min-w-[300px] h-[900px] flex flex-col bg-gray-100 shadow-md text-sm font-bold items-start py-5">
       <Link to={"/manage"} tw="w-full flex items-center px-5 py-2 rounded hover:bg-[#191F4D] hover:text-white"><FaRegUserCircle tw='mr-1'/>クライアント管理</Link>
      <button onClick={changeCompanyBlock} tw='w-full flex items-center px-5 py-2'><FaHome tw='mr-1'/>会社管理</button>
       <div tw="w-full pl-5" >
        <Link to={"companymanage"} tw="w-full flex items-center px-5 py-2 rounded hover:bg-[#191F4D] hover:text-white " onClick={()=>{setChange("companymanage")}}><FaHome tw='mr-1'/>会社管理</Link>
        <Link to={""} tw='w-full flex items-center px-5 py-2 rounded hover:bg-[#191F4D] hover:text-white'><IoIosPricetags tw='mr-1'/>価格感管理</Link>  
        <Link to={""} tw='w-full flex items-center px-5 py-2 rounded hover:bg-[#191F4D] hover:text-white'><FaTasks tw='mr-1'/>解決できる課題管理</Link>  
        <Link to={""} tw='w-full flex items-center px-5 py-2 rounded hover:bg-[#191F4D] hover:text-white'><MdFeaturedPlayList tw='mr-1'/>得意な領域管理</Link>  
        <Link to={""} tw='w-full flex items-center px-5 py-2 rounded hover:bg-[#191F4D] hover:text-white'><FaTools tw='mr-1'/>ツール管理</Link>  
        <Link to={""} tw='w-full flex items-center px-5 py-2 rounded hover:bg-[#191F4D] hover:text-white'><IoMdTime tw='mr-1'/>対応可能な時間管理</Link>  
        <Link to={""} tw='w-full flex items-center px-5 py-2 rounded hover:bg-[#191F4D] hover:text-white'><GiAchievement tw='mr-1'/>業界実績管理</Link>  
        <Link to={""} tw='w-full flex items-center px-5 py-2 rounded hover:bg-[#191F4D] hover:text-white'><MdCampaign tw='mr-1'/>特典キャンペーン管理</Link>  
      </div>
      <button onClick={changeColumnBlock} tw='w-full flex items-center px-5 py-2'><RiArticleLine tw='mr-1'/>コラム記事管理</button>
      <div tw="w-full pl-5" >
        <Link to={"columnmanage"} tw="w-full flex items-center px-5 py-2 rounded hover:bg-[#191F4D] hover:text-white" onClick={()=>{setChange("columnmanage")}}><RiArticleLine tw='mr-1'/>コラム記事管理</Link>  
        <Link to={""} tw='w-full flex items-center px-5 py-2 rounded hover:bg-[#191F4D] hover:text-white'><BiCategory tw='mr-1'/>カテゴリー管理</Link>  
      </div>
      <Link to={"newsmanage"} tw="w-full flex items-center px-5 py-2 rounded hover:bg-[#191F4D] hover:text-white" onClick={()=>{setChange("newsmanage")}}><FaNewspaper tw='mr-1'/>ニュース管理</Link>
      <Link to={""} tw='w-full flex items-center px-5 py-2 rounded hover:bg-[#191F4D] hover:text-white'><FaRegQuestionCircle tw='mr-1'/>質問管理</Link>
      <Link to={""} tw='w-full flex items-center px-5 py-2 rounded hover:bg-[#191F4D] hover:text-white'><MdOutlineMapsHomeWork tw='mr-1'/>希望掲載企業管理</Link>
    </div>
  );
  
};
export default AdminNav;