
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SlArrowLeft } from "react-icons/sl";

import { useDispatch, useSelector } from 'react-redux';
import { getOneNews } from "../../../redux/slice/newsSlice";


const NewsManageDetail=()=>{
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const Id=useParams().id;
  const { oneNewsData } = useSelector(state => state.news);

  useEffect(() => {
    dispatch(getOneNews(Id));
  },[]);

  useEffect(() => {
    console.log(oneNewsData);
  },[oneNewsData]);

  return(
    <div className={`-webkit-fill-available h-[900px] bg-white shadow items-center px-20 py-20 overflow-y-auto`}>
      <div className="flex flex-col w-full justify-center items-center pb-5">
        <p className="text-xl font-bold mb-5 mx-5">{oneNewsData.title}</p>
        {oneNewsData.image && <img className='w-[60%] rounded' src={`${process.env.REACT_APP_BASE_URL}/img/${oneNewsData.image}`} />}
      </div>
        <div className="flex flex-col items-start px-5 py-2">
          <label className="font-bold">【登録日】</label>
          {oneNewsData.createdAt && <p>{oneNewsData.createdAt.slice(0,10) }</p>}
        </div>
        <div className="flex flex-col items-start px-5 py-2">
          <label className="font-bold">【コンテンツ】</label>
          <p className="text-left">{oneNewsData.contents}</p>
        </div>
        <div>
        {oneNewsData.newschildren && oneNewsData.newschildren.map((child, index) => {
              return (
                <div className='w-full flex flex-col px-5 py-5' key={index}>
                  {child.title && <h2 className='text-xl text-left py-2'>{child.title}</h2>}
                  {child.description && <p className='text-left sp:text-sm'>{child.description}</p>}
                </div>
              );
            })
            }
        </div>    
      <div className="w-full flex justify-center items-center">
       <Link to="/manage/newsmanage" className="flex items-center border text-sm px-3 py-1 rounded-md hover:bg-[#B40100] hover:text-white"><SlArrowLeft className='mx-1' /> 前に戻る</Link>
      </div>
    </div>
  );
  
};
export default NewsManageDetail;