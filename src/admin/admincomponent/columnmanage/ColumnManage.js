
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
// import { getCompanyList, deleteOneCompany } from "../../../redux/slice/companySlice";
import Pagination from '../../Pagination';
import { Select } from "antd";
import { deleteOneColumn, getColumnList } from "../../../redux/slice/columnSlice";

const ColumnManage=()=>{
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const  { allColumnList } = useSelector(state => state.columns);
  
  const [currentPage, setCurrentPage]=useState(1)
  const [recordsPerPage, setRecordPerPage]=useState(3);
  const [data, setData]=useState([]);
  const [deleted, setDeleted]=useState("");

  useEffect(() => {
    dispatch(getColumnList());
  },[]);

  useEffect(() => {
    console.log(allColumnList)
    setData(allColumnList)
  },[allColumnList]);

  const deleteFunction = (id) => {
    dispatch(deleteOneColumn(id)).then(() => {
      dispatch(getColumnList());
      setCurrentPage(1);
    })
  }

  const indexOfLastRecord = currentPage*recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord-recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages=Math.ceil(data.length/recordsPerPage);

  return(
    <div tw="h-[900px] bg-white shadow items-center py-10">
      <p tw="text-xl text-center font-bold">コラム記事管理</p>
      <div tw="w-full flex justify-end items-end px-20 pt-10">
        <Link to={"column_add"} tw='flex items-center text-sm text-white rounded-md bg-blue-700 mx-2 px-10 py-1 hover:bg-white hover:text-black hover:border'><IoAddCircleOutline tw="font-bold mr-2" />新規登録</Link>
      </div>
      <div tw="flex flex-col mx-10 h-[70%] overflow-y-auto">
        <div tw="inline-block min-w-full px-10">
        {currentRecords && currentRecords.map((column, index)=>{
            return(
              <div key={index} tw='w-full bg-white flex rounded-2xl shadow mt-10 px-10 py-5 border'>
                <div tw='w-full flex flex-col text-left px-5'>
                  <div tw="flex w-full">
                    <div tw='w-[400px] flex justify-center items-center'>
                     {column.thumbnail && <img tw='w-[80%] rounded hover:opacity-50 hover:scale-110' src={`${process.env.REACT_APP_BASE_URL}/img/${column.thumbnail}`} />}
                    </div>
                    <div tw="w-full">
                      <p tw="font-bold font-bold text-center">{column.title}</p>
                      <div tw="w-full flex justify-between px-5 py-3">
                        <div tw="flex">
                          {column.columncategories && column.columncategories.map((category, index1)=>{
                            return(
                              <span key={index1} tw="mx-1 bg-gray-300 text-xs rounded px-2 py-1">{category.text}</span>
                            );
                          })
                          }
                        </div>
                      <span tw='text-sm mt-2 text-red-500'>{column.createdAt.slice(0,10)}</span>
                      </div>
                      <p tw='text-sm'>{column.description}</p>  
                    </div>
                  </div>
                  
                  <div tw='w-full flex justify-center items-center mt-3'>
                    <Link to={"column_detail/"+column.id} tw='flex items-center text-sm text-white rounded-md bg-green-500 mx-2 px-10 py-1 hover:bg-white hover:text-black hover:border'><CiCircleMore tw="font-bold mr-2" />詳細</Link>
                    <Link to={"column_update/"+column.id} tw='flex items-center text-sm text-white rounded-md bg-yellow-300 mx-2 px-10 py-1 hover:bg-white hover:text-black hover:border'><RxUpdate tw="font-bold mr-2" />更新</Link>
                    <button tw='flex items-center text-sm text-white rounded-md bg-red-500 mx-2 px-10 py-1 hover:bg-white hover:text-black hover:border' onClick={()=>deleteFunction(column.id)}><RiDeleteBin6Line tw="font-bold mr-2" />削除</button>
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
export default ColumnManage;