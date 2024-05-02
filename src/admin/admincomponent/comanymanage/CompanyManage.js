
import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { CiCircleMore } from "react-icons/ci";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoAddCircleOutline } from "react-icons/io5";

import { useDispatch, useSelector } from 'react-redux';
import { getCompanyList, deleteOneCompany } from "../../../redux/slice/companySlice";
import Pagination from '../../Pagination';
import { Select } from "antd";

const CompanyManage=()=>{
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const  { allCompanyList } = useSelector(state => state.companies);
  
  const [currentPage, setCurrentPage]=useState(1)
  const [recordsPerPage, setRecordPerPage]=useState(3);
  const [data, setData]=useState([]);
  const [deleted, setDeleted]=useState("");

  useEffect(() => {
    dispatch(getCompanyList());
  },[]);

  useEffect(() => {
    setData(allCompanyList)
    console.log(allCompanyList);
  },[allCompanyList]);

  const deleteFunction = (id) => {
    console.log(id);
    dispatch(deleteOneCompany(id)).then(() => {
      dispatch(getCompanyList());
      setCurrentPage(1);
    })
  }

  const moveDetail=(id)=>{
    navigate("company_detail/"+id);
  }
  const moveUpdate=(id)=>{
    navigate("company_update/"+id);
  }

  const indexOfLastRecord = currentPage*recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord-recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages=Math.ceil(data.length/recordsPerPage);

  return(
    <div tw="h-[900px] bg-white shadow items-center overflow-y-auto py-10">
      <p tw="text-xl text-center font-bold">会社管理</p>
      <div tw="w-full flex justify-end items-end px-20 pt-10">
        <Link to={"company_add"} tw='flex items-center text-sm text-white rounded-md bg-blue-700 mx-2 px-10 py-1 hover:bg-white hover:text-black hover:border'><IoAddCircleOutline tw="font-bold mr-2" />新規登録</Link>
      </div>
      <div tw="flex flex-col mx-10 h-[70%] overflow-y-auto">
        <div tw="inline-block min-w-full px-10">
        {currentRecords && currentRecords.map((company, index)=>{
            return(
              <div key={index} tw='w-full bg-white flex rounded-2xl shadow mt-10 px-10 py-5 border'>
                <div tw='w-full flex flex-col text-left px-5'>
                  <div tw='w-full flex justify-center items-center'>
                    <div tw='flex justify-center items-center px-5'>
                      <div tw='w-[60px] h-[60px] border p-1 rounded shadow'>
                        <img tw='w-full h-full rounded hover:opacity-50 hover:scale-110' src={`${process.env.REACT_APP_BASE_URL}/img/${company.logo}`} />
                      </div>
                    </div>
                    <p tw='font-bold'>{company.name}</p>
                  </div>

                  <p tw='text-sm font-bold mt-2'>【PRタイトル】</p>
                  <p tw="font-bold">{company.title}</p>
                  <p tw='text-sm mt-2'>【紹介文】</p>
                  <p tw=''>{company.description}</p>
                  <p tw='text-sm mt-2'>【得意な領域】</p>
                  <p tw=''>{company.expertises.map((text, index)=>{
                    return(
                      <span key={index}>{text.text}{index<company.expertises.length-1?", ":""}</span>
                    );
                  })}</p>
                  <p tw='text-sm mt-2'>【マーケティングツール】</p>
                  <p>{company.tools.map((text, index)=>{
                    return(
                      <span key={index}>{text.text}{index<company.tools.length-1?", ":""}</span>
                    );
                  })}</p>
                  <p tw='text-sm mt-2'>【解決できる課題】</p>
                  <p tw=''>{company.solvedissues.map((text, index)=>{
                    return(
                      <span key={index}>{text.text}{index<company.solvedissues.length-1?", ":""}</span>
                    );
                  })}</p>
                  <p tw='text-sm mt-2'>【価格】</p>
                  <p>{company.pricesence.text}</p>
                  <p tw='text-sm mt-2'>【業界実績】</p>
                  <p>{company.industryexperiences.map((text, index)=>{
                    return(
                      <span key={index}>{text.text}{(index < company.industryexperiences.length-1)?", ":""}</span>
                    );
                  })}</p>
                  <div tw='w-full flex justify-center items-center mt-3'>
                    <button onClick={()=>moveDetail(company.id)} tw='flex items-center text-sm text-white rounded-md bg-green-500 mx-2 px-10 py-1 hover:bg-white hover:text-black hover:border'><CiCircleMore tw="font-bold mr-2" />詳細</button>
                    <button onClick={()=>moveUpdate(company.id)} tw='flex items-center text-sm text-white rounded-md bg-yellow-300 mx-2 px-10 py-1 hover:bg-white hover:text-black hover:border'><RxUpdate tw="font-bold mr-2" />変更</button>
                    <button tw='flex items-center text-sm text-white rounded-md bg-red-500 mx-2 px-10 py-1 hover:bg-white hover:text-black hover:border' onClick={()=>deleteFunction(company.id)}><RiDeleteBin6Line tw="font-bold mr-2" />削除</button>
                  </div>
                </div>
              </div>      
            );
        })}       
        </div>
      </div>
          <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          <div tw="w-full flex py-3 mx-auto items-center justify-center">
            <span tw="text-red-500 text-sm mr-3">表示する個数 :</span>
            <Select tw="w-20" 
              value={recordsPerPage}
              onChange={ (value) => setRecordPerPage(value)}
              options={
                [
                  {
                    value:"1",
                    label:"1"
                  },
                  {
                    value:"3",
                    label:"3"
                  },
                  {
                    value:"5",
                    label:"5"
                  }
                ]
              }
            />
          </div>
    </div>
  );
  
};
export default CompanyManage;