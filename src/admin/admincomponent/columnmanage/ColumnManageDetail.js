
import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SlArrowLeft } from "react-icons/sl";

import { useDispatch, useSelector } from 'react-redux';
import { getOneColumn } from "../../../redux/slice/columnSlice";


const ColumnManageDetail=()=>{
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const Id=useParams().id;
  const  { oneColumnData } = useSelector(state => state.columns);

  useEffect(() => {
    dispatch(getOneColumn(Id));
  },[]);

  // useEffect(() => {
  //   console.log(oneColumnData);
  // },[oneColumnData]);

  return(
    <div tw="h-[900px] bg-white shadow items-center px-20 py-20 overflow-y-auto">
      <div tw="flex flex-col w-full justify-center items-center pb-5">
        <p tw="text-xl font-bold mb-5 mx-5">{oneColumnData.title}</p>
        {oneColumnData.thumbnail && <img tw='w-[20%] rounded hover:opacity-50 hover:scale-110' src={`${process.env.REACT_APP_BASE_URL}/img/${oneColumnData.thumbnail}`} />}
      </div>
       <div tw="flex flex-col text-left mx-20 py-5">
        <div tw="flex flex-col items-start py-2">
          <label tw="font-bold">【カテゴリー】</label>
          <p>{oneColumnData.columncategories && oneColumnData.columncategories.map((text, index)=>{
            return(
              <span key={index}>{text.text}{(index < oneColumnData.columncategories.length-1)?", ":""}</span>
            );
          })}
          </p>
        </div>
        <div tw="flex flex-col items-start py-2">
          <label tw="font-bold">【登録日】</label>
          {oneColumnData.createdAt && <p>{oneColumnData.createdAt.slice(0,10) }</p>}
        </div>
        <div tw="flex flex-col items-start py-2">
          <label tw="font-bold">【コンテンツ】</label>
          <p>{oneColumnData.description}</p>
        </div>
        <div tw="flex flex-col items-start py-2">
          <label tw="font-bold">【画像説明(alt)】</label>
          <p>{oneColumnData.alt}</p>
        </div>
        <div>
          {oneColumnData.columnfirstchildren && oneColumnData.columnfirstchildren.map((section1, index1)=>{
              return(
                <div tw="ml-5" key={index1}>
                  <label tw="font-bold">{`【中見出し${index1+1}】`}</label>
                  <p>{section1.title}</p>
                  <label tw="font-bold">【コンテンツ】</label>
                  <p>{section1.description}</p>
                  <label tw="font-bold">【画像説明(alt)】</label>
                  <p>{section1.alt}</p>
                  <div tw="w-full flex flex-col w-full justify-center items-center pb-5">
                     {section1.image && <img tw='w-[20%] rounded hover:opacity-50 hover:scale-110' src={`${process.env.REACT_APP_BASE_URL}/img/${section1.image}`} />}
                  </div>
                  {
                    section1 && section1.columnsecondchildren.map((section2, index2)=>{
                      return(
                        <div tw="ml-10" key={index2}>
                          <label tw="font-bold">{`【小見出し${index2+1}】`}</label>
                          <p>{section2.title}</p>
                          <label tw="font-bold">【コンテンツ】</label>
                          <p>{section2.description}</p>
                          <label tw="font-bold">【画像説明(alt)】</label>
                          <p>{section2.alt}</p>
                          <div tw="w-full flex flex-col w-full justify-center items-center pb-5">
                            {section2.image && <img tw='w-[20%] rounded hover:opacity-50 hover:scale-110' src={`${process.env.REACT_APP_BASE_URL}/img/${section2.image}`} />}
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              );
            })
          }
        </div>    
      </div>
      <div tw="w-full flex justify-center items-center">
       <Link to={"/manage/columnmanage"} tw="flex items-center border text-sm px-3 py-1 rounded-md hover:bg-[#B40100] hover:text-white"><SlArrowLeft tw='mx-1' /> 前に戻る</Link>
      </div>
    </div>
  );
  
};
export default ColumnManageDetail;