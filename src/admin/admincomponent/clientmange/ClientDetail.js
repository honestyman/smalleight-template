
import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SlArrowLeft } from "react-icons/sl";

import { useDispatch, useSelector } from 'react-redux';
import { getOneClient } from "../../../redux/slice/clientSlice";


const ClientDetail=()=>{
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const Id=useParams().id;
  const  { oneClientData } = useSelector(state => state.clients);
  
  const [currentPage, setCurrentPage]=useState(1)
  const [recordsPerPage, setRecordPerPage]=useState(6);
  const [data, setData]=useState([]);

  useEffect(() => {
    dispatch(getOneClient(Id));
  },[]);

  useEffect(() => {
    console.log(oneClientData);
  },[oneClientData]);

  return(
    <div tw="h-[900px] bg-white shadow items-center py-10 overflow-y-auto">
      <p tw="text-xl font-bold text-center">クライアント詳細</p>
      <div tw="flex flex-col text-sm mx-20 py-10">
        <div tw="flex justify-start items-center py-3">
          <label tw="font-bold">お名前 : </label>
          <p tw="mx-5">{oneClientData.name}</p>
        </div>
        <div tw="flex justify-start items-center py-3">
          <label tw="font-bold">会社名 : </label>
          <p tw="mx-5">{oneClientData.company}</p>
        </div>
        <div tw="flex justify-start items-center py-3">
          <label tw="font-bold">メールアドレス : </label>
          <p tw="mx-5">{oneClientData.email}</p>
        </div>
        {
          oneClientData.phoneNumber && 
          <div tw="flex justify-start items-center py-3">
            <label tw="font-bold">電話番号 : </label>
            <p tw="mx-5">{oneClientData.phoneNumber}</p>
          </div>
        }
        {
          oneClientData.questionContent && 
          <div tw="flex justify-start items-center py-3">
            <label tw="font-bold">その他お問い合わせ内容 : </label>
            <p tw="mx-5">{oneClientData.questionContent}</p>
          </div>
        }
        {
          oneClientData.service && 
          <div tw="flex justify-start items-center py-3">
            <label tw="font-bold">選択したサービス : </label>
            <p tw="mx-5">{oneClientData.service}</p>
          </div>
        }
        {
          oneClientData.purpose && 
          <div tw="flex justify-start items-center py-3">
            <label tw="font-bold">ウェブマーケティングで達成したい目標 : </label>
            <p tw="mx-5">{oneClientData.purpose}</p>
          </div>
        }
        {
          oneClientData.measures && 
          <div tw="flex justify-start items-center py-3">
            <label tw="font-bold">実施したいウェブマーケティング施策 : </label>
            <p tw="mx-5">{oneClientData.measures}</p>
          </div>
        }
        {
          oneClientData.tools && 
          <div tw="flex justify-start items-center py-3">
            <label tw="font-bold">探しているツール : </label>
            <p tw="mx-5">{oneClientData.tools}</p>
          </div>
        }
        {
          oneClientData.currentMeasures && 
          <div tw="flex justify-start items-center py-3">
            <label tw="font-bold">現在実施しているウェブポリシー : </label>
            <p tw="mx-5">{oneClientData.currentMeasures}</p>
          </div>
        }
        {
          oneClientData.startDate && 
          <div tw="flex justify-start items-center py-3">
            <label tw="font-bold">ウェブマーケティングを開始 : </label>
            <p tw="mx-5">{oneClientData.startDate}</p>
          </div>
        }
        {
          oneClientData.budget && 
          <div tw="flex justify-start items-center py-3">
            <label tw="font-bold">予想予算 : </label>
            <p tw="mx-5">{oneClientData.budget}</p>
          </div>
        }
        {
          oneClientData.selectedCompany && 
          <div tw="flex justify-start items-center py-3">
            <label tw="font-bold">お問い合わせ会社 : </label>
            <p tw="mx-5">{oneClientData.selectedCompany}</p>
          </div>
        }
        {
          oneClientData.createdAt && 
          <div tw="flex justify-start items-center py-3">
            <label tw="font-bold">お問い合わせ日 : </label>
            <p tw="mx-5">{oneClientData.createdAt.slice(0,10)}</p>
          </div>
        }
      </div>
      <div tw="w-full flex justify-center items-center">
       <Link to={"/manage"} tw="flex items-center px-3 py-1 text-sm border rounded-md hover:bg-[#B40100] hover:text-white"><SlArrowLeft tw='mx-1' /> 前に戻る</Link>
      </div>
    </div>
  );
  
};
export default ClientDetail;