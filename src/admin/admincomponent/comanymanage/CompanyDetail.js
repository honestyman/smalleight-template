
import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SlArrowLeft } from "react-icons/sl";

import { useDispatch, useSelector } from 'react-redux';
import { getOneCompany } from "../../../redux/slice/companySlice";


const CompanyDetail=()=>{
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const Id=useParams().id;
  const  { oneCompany } = useSelector(state => state.companies);

  useEffect(() => {
    dispatch(getOneCompany(Id));
  },[]);

  useEffect(() => {
    console.log(oneCompany);
  },[oneCompany]);

  return(
    <div tw="h-[900px] bg-white shadow items-center text-sm py-20 overflow-y-auto">
      <div tw="flex w-full justify-center items-center">
        <div tw="w-[60px] h-[60px] border p-1 rounded shadow">
          <img tw='w-full h-full rounded hover:opacity-50 hover:scale-110' src={`${process.env.REACT_APP_BASE_URL}/img/${oneCompany.logo}`} />
        </div>
        <p tw="text-xl font-bold mx-5">{oneCompany.name}</p>
      </div>
      <div tw="flex flex-col text-left mx-20 py-5">
        <div tw="flex flex-col items-start py-2">
          <label tw="font-bold">【PRタイトル】</label>
          <p>{oneCompany.title}</p>
        </div>
        <div tw="flex flex-col items-start py-2">
          <label tw="font-bold">【紹介文】</label>
          <p>{oneCompany.description}</p>
        </div>
        <div tw="flex flex-col items-start py-2">
          <label tw="font-bold">【特典キャンペーン】</label>
          <p>{oneCompany.campaigns && oneCompany.campaigns.map((text, index)=>{
            return(
              <span key={index}>{text.text}{(index < oneCompany.campaigns.length-1)?", ":""}</span>
            );
          })}</p>
        </div>
        <div tw="flex flex-col items-start py-2">
          <label tw="font-bold">【得意な領域】</label>
          <p>{oneCompany.expertises && oneCompany.expertises.map((text, index)=>{
            return(
              <span key={index}>{text.text}{(index < oneCompany.expertises.length-1)?", ":""}</span>
            );
          })}</p>
        </div>
        <div tw="flex flex-col items-start py-2">
          <label tw="font-bold">【マーケティングツール】</label>
          <p>{oneCompany.tools && oneCompany.tools.map((text, index)=>{
            return(
              <span key={index}>{text.text}{(index < oneCompany.tools.length-1)?", ":""}</span>
            );
          })}</p>
        </div>
        <div tw="flex flex-col items-start py-2">
          <label tw="font-bold">【解決できる課題】</label>
          <p>{oneCompany.solvedissues && oneCompany.solvedissues.map((text, index)=>{
            return(
              <span key={index}>{text.text}{(index < oneCompany.solvedissues.length-1)?", ":""}</span>
            );
          })}</p>
        </div>
        <div tw="flex flex-col items-start py-2">
          <label tw="font-bold">【価格】</label>
          {oneCompany.pricesence && <p>{oneCompany.pricesence.text}</p>}
        </div>
        <div tw="flex flex-col items-start py-2">
          <label tw="font-bold">【いつから対応可能か】</label>
          {oneCompany.startdate && <p>{oneCompany.startdate.text}</p>}
        </div>
        <div tw="flex flex-col items-start py-2">
          <label tw="font-bold">【業界実績】</label>
          <p>{oneCompany.industryexperiences && oneCompany.industryexperiences.map((text, index)=>{
            return(
              <span key={index}>{text.text}{(index < oneCompany.industryexperiences.length-1)?", ":""}</span>
            );
          })}</p>
        </div>
        <div tw="flex flex-col items-start py-2">
          <label tw="font-bold">【代表者名】</label>
          <p>{oneCompany.representativeName}</p>
        </div>
        <div tw="flex flex-col items-start py-2">
          <label tw="font-bold">【住所】</label>
          <p>{oneCompany.address}</p>
        </div>
        <div tw="flex flex-col items-start py-2">
          <label tw="font-bold">【設立年】</label>
          <p>{oneCompany.establishedYear}年</p>
        </div>
        <div tw="flex flex-col items-start py-2">
          <label tw="font-bold">【従業員数】</label>
          <p>{oneCompany.memberCount}</p>
        </div>
        <div tw="flex flex-col items-start py-2">
          <label tw="font-bold">【売上高】</label>
          <p>{oneCompany.sales}</p>
        </div>
        <div tw="flex flex-col items-start py-2">
          <label tw="font-bold">【掲載形態】</label>
          <p>{oneCompany.publishForm}</p>
        </div>
        
      </div>
      <div tw="w-full flex justify-center items-center">
       <Link to={"/manage/companymanage"} tw="flex items-center border text-sm px-3 py-1 rounded-md hover:bg-[#B40100] hover:text-white"><SlArrowLeft tw='mx-1' /> 前に戻る</Link>
      </div>
    </div>
  );
  
};
export default CompanyDetail;