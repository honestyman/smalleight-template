
import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { IoAddCircleOutline } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

import { Input, Select, Upload, Button, message, Tree } from "antd";
import { UploadOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { getCampaignList, getExpertiseList, getToolsList, getSolvedissueList, getPricesenceList, getStartDateList, getIndustryExperienceList, addCompany, addCompanyLogo } from "../../../redux/slice/companySlice";
import TextArea from "antd/es/input/TextArea";
import { addColumn, addColumnThumbnail, getColumnCategoryList, addColumnFirstImage, addColumnSecondImage } from "../../../redux/slice/columnSlice";


// It's just a simple demo. You can use tree map to optimize update perf.
const ColumnAddPage=()=>{

  const dispatch = useDispatch();

  const [parentTitleValues, setParentTitleValues] = useState([]);
  const [parentContentValues, setParentContentValues] = useState([]);
  const [childrenTitleValues, setChildrenTitleValues] = useState([]);
  const [childrenContentValues, setChildrenContentValues] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState();
  const [alt, setAlt] = useState("");
  const [columnCategories, setColumnCategories] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [parentImage, setParentImage] = useState([]);
  const [childrenImage, setChildrenImage] = useState([]);
  const [parentImageName, setParentImageName] = useState([]);
  const [childrenImageName, setChildrenImageName] = useState([]);
  const [parentAlt, setParentAlt] = useState([]);
  const [childAlt, setChildAlt] = useState([]);

  const [parent, setParent]=useState("")
  
  const [validTitle, setValidTitle] = useState("");
  const [validDescription, setValidDescription] = useState("");
  const [validColumnCategory, setValidColumnCategory] = useState("");
  const [validThumbnail, setValidThumbnail] = useState("");
  const [validAlt, setValidAlt] = useState("");

  const { allColumnCategoryList } = useSelector(state => state.columns);

  useEffect(() =>{
    dispatch(getColumnCategoryList())
  },[])
  
  const categoryData = () =>{
    const result=[];
    for(let i=0;i<allColumnCategoryList.length;i++){
      result.push({
        value:allColumnCategoryList[i].text,
        label:allColumnCategoryList[i].text,
      })
    }
    return result;
  }

  useEffect(() => {
    // const filePath = URL.createObjectURL(logo);
    if (thumbnail) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(thumbnail);
    } else {
      setImagePreview(null);
    }

  },[thumbnail]);

  const getThumbnailImage = async(e) => {
    // setLogo(e.target.files[0]);
    var file=e.target.files[0]
    
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
    
    if (!isJpgOrPng) {
      message.error('アップロードできる画像はJPG/PNG/WEBPのみです！');
      // setFileFlag(false);
    }
    if(isJpgOrPng){
      setThumbnail(file);
    }
    
    // return isJpgOrPng && pixels <= maxPixels;
  };

  const getParentImage = async(key, file) =>{
    console.log(key, file);
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
    
    if (!isJpgOrPng) {
      message.error('アップロードできる画像はJPG/PNG/WEBPのみです！');
    }
    if(isJpgOrPng){
      setParentImage((previousData) => {
        const data = previousData.filter(element => element.key != key);
        return [...data, { key:key, image:file }];
      });
      setParentImageName((previousData) => {
        const data = previousData.filter(element => element.key != key);
        return [...data, { key:key, image:file.name }];
      });
      // if((parentContentValues.filter(ele => ele.key == key)).length == 0){
      //   setParentContentValues((previousData) => {
      //     return [...previousData, { key:key, value:"" }];
      //   })
      // }
      // if((parentTitleValues.filter(ele => ele.key == key)).length == 0){
      //   setParentTitleValues((previousData) => {
      //     return [...previousData, { key:key, value:"" }];
      //   })
      // }
    }
  }
  const getChildrenImage = async(key, file) =>{
    console.log(key, file);
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
    
    if (!isJpgOrPng) {
      message.error('アップロードできる画像はJPG/PNG/WEBPのみです！');
    }
    if(isJpgOrPng){
      setChildrenImage((previousData) => {
        const data = previousData.filter(element => element.key != key);
        return [...data, { key:key, image:file }];
      });
      setChildrenImageName((previousData) => {
        const data = previousData.filter(element => element.key != key);
        return [...data, { key:key, image:file.name }];
      });
      // if((childrenTitleValues.filter(ele => ele.key == key)).length == 0){
      //   setChildrenTitleValues((previousData) => {
      //     return [...previousData, { key:key, value:"" }];
      //   })
      // }
      // if((childrenContentValues.filter(ele => ele.key == key)).length == 0){
      //   setChildrenContentValues((previousData) => {
      //     return [...previousData, { key:key, value:"" }];
      //   })
      // }
    }
  }

  useEffect(()=>{
    console.log("=======",parentContentValues);
  },[parentContentValues])

  useEffect(() =>{
    console.log(parentTitleValues)
  },[parentTitleValues])

  useEffect(() =>{
    console.log(parentImageName)
  },[parentImageName])

  const changeParentTitle = (key, value)=>{
      if(value){
        setParentTitleValues((previousData) => {
          const data = previousData.filter(element => element.key != key);
          return [...data, { key, value }];
        });
      }   
  }

  const changeParentContent = (key, value)=>{
    if(value){
      setParentContentValues((previousData) => {
        const data = previousData.filter(element => element.key != key);
        return [...data, { key, value }];
      })
    }   
  }

  const changeParentAlt = (key, value)=>{
    if(value){
      setParentAlt((previousData) => {
        const data = previousData.filter(element => element.key != key);
        return [...data, { key, value }];
      })
    }   
  }

  const changeChildrenTitle = (key, value)=>{
    if(value){
      setChildrenTitleValues((previousData) => {
        const data = previousData.filter(element => element.key != key);
        return [...data, { key, value }];
      })
    }
  }
  const changeChildrenContent = (key, value)=>{
    if(value){
      setChildrenContentValues((previousData) => {
        const data = previousData.filter(element => element.key != key);
        return [...data, { key, value }];
      })
    }
  }
  const changeChildAlt = (key, value)=>{
    if(value){
      setChildAlt((previousData) => {
        const data = previousData.filter(element => element.key != key);
        return [...data, { key, value }];
      })
    }   
  }

  const handleClickAddColumn =()=>{
    if(!title){
      setValidTitle("※この項目は必須入力項目です。")
    }else{
      setValidTitle("")
    }
    if(!description){
      setValidDescription("※この項目は必須入力項目です。")
    }else{
      setValidDescription("")
    }
    if(!columnCategories){
      setValidColumnCategory("※この項目は必須入力項目です。")
    }else{
      setValidColumnCategory("")
    }
    if(!thumbnail){
      setValidThumbnail("※この項目は必須入力項目です。")
    }else{
      setValidThumbnail("")
    }
    if(!alt){
      setValidAlt("※この項目は必須入力項目です。")
    }else{
      setValidAlt("")
    }

    if(title && description && columnCategories && thumbnail && alt){
      const payload={
        title: title,
        description: description,
        columnCategories: columnCategories,
        firstTitleValues: parentTitleValues.sort(function(a, b) {
          return a.key.localeCompare(b.key);
        }),
        firstContentValues: parentContentValues.sort(function(a, b) {
          return a.key.localeCompare(b.key);
        }), 
        firstImageName: parentImageName.sort(function(a, b) {
          return a.key.localeCompare(b.key);
        }),
        firstAlt: parentAlt.sort(function(a, b) {
          return a.key.localeCompare(b.key);
        }),
        secondTitleValues: childrenTitleValues.sort(function(a, b) {
          return a.key.localeCompare(b.key);
        }),
        secondContentValues: childrenContentValues.sort(function(a, b) {
          return a.key.localeCompare(b.key);
        }),
        secondImageName: childrenImageName.sort(function(a, b) {
          return a.key.localeCompare(b.key);
        }),
        secondAlt: childAlt.sort(function(a, b) {
          return a.key.localeCompare(b.key);
        }),
        thumbnail: thumbnail.name,
        alt: alt
      }
      if(payload){
        dispatch(addColumn(payload)).then(()=>{
          alert("正確に登録されています！");  
          if(thumbnail){
             dispatch(addColumnThumbnail(thumbnail));
          }
          if(parentImage){            
            for(let i=0; i<parentImage.length; i++){
              dispatch(addColumnFirstImage(parentImage[i].image))
            }
          }
          if(childrenImage){
            for(let i=0; i<childrenImage.length; i++){
              dispatch(addColumnSecondImage(childrenImage[i].image))
            }
          }
        })
      }
    }

  }

  const handleAddParent = () => {
    if(treeData.length){
      if(treeData.length === parentTitleValues.length || treeData.length === parentContentValues.length){
        setTreeData([
          ...treeData,
          {
            key: (parseInt(treeData[treeData.length-1 ].key)+1).toString(),
            title: <div tw="w-[90%] flex flex-col">
                      <div tw="flex flex-col items-start py-2">
                        <label tw="font-bold mb-1">【中見出し】</label>
                        <Input type="text" onChange={(e)=>changeParentTitle((parseInt(treeData[treeData.length-1 ].key)+1).toString(), e.target.value)} />
                      </div>
                      <div tw="flex flex-col items-start py-2">
                        <label tw="font-bold mb-1">【コンテンツ】</label>
                        <TextArea type="text" onChange={(e)=>changeParentContent((parseInt(treeData[treeData.length-1 ].key)+1).toString(), e.target.value)}/>
                      </div>
                      <div tw="flex flex-col items-start py-2">
                        <input
                          tw="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] font-normal transition duration-300 ease-in-out"
                          type="file"
                          id="formFile"
                          onChange={(e)=>getParentImage((parseInt(treeData[treeData.length-1 ].key)+1).toString(), e.target.files[0])} 
                          />
                      </div>
                      <div tw="flex flex-col items-start py-2">
                        <label tw="font-bold mb-1">【画像説明(alt)】</label>
                        <Input type="text" onChange={(e)=>changeParentAlt((parseInt(treeData[treeData.length-1 ].key)+1).toString(), e.target.value)} />
                      </div>
                   </div>,
            children: []
          } 
        ])
      }
    }else{
      setTreeData(
        [
          {
            key: "1",
            title: <div tw="w-[90%] flex flex-col">
                      <div tw="flex flex-col items-start py-2">
                        <label tw="font-bold mb-1">【中見出し】</label>
                        <Input type="text" onChange={(e)=>changeParentTitle("1", e.target.value)}/>
                      </div>
                      <div tw="flex flex-col items-start py-2">
                        <label tw="font-bold mb-1">【コンテンツ】</label>
                        <TextArea type="text" onChange={(e)=>changeParentContent("1", e.target.value)}/>
                      </div>
                      <div tw="flex flex-col items-start py-2">
                        <input
                          tw="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] font-normal transition duration-300 ease-in-out"
                          type="file"
                          id="formFile"
                          onChange={(e)=>getParentImage("1", e.target.files[0])} 
                          />
                      </div>
                      <div tw="flex flex-col items-start py-2">
                        <label tw="font-bold mb-1">【画像説明(alt)】</label>
                        <Input type="text" onChange={(e)=>changeParentAlt("1", e.target.value)}/>
                      </div>
                   </div>,
            children: []
          }
        ]
      )
    }
  }

  const hasChild = (node) => {
    if(node.children.length){
      if(node.children.length == childrenTitleValues.filter(data=>(data.key[0]==node.key)).length || node.children.length == childrenContentValues.filter(data=>(data.key[0]==node.key)).length){
        return true;
      }else{
        return false;
      }
    }else{
      return true;
    }

  }

  const handleAddChildren = (key) => {
    console.log(key);
    const updatedTreeData = treeData.map((node) => {
      if (node.key === key) {
        if(hasChild(node)){
          return {
            ...node,
            children: [
              ...node.children,
              {
                key: `${node.key}-${node.children.length + 1}`,
                title: <div tw="w-full flex flex-col pl-10 py-3">
                          <div tw="flex flex-col items-start py-2">
                            <label tw="font-bold mb-1">【小見出し】</label>
                            <Input type="text" onChange={(e)=>changeChildrenTitle(`${node.key}-${node.children.length + 1}`, e.target.value)}/>
                          </div>
                          <div tw="flex flex-col items-start py-2">
                            <label tw="font-bold mb-1">【コンテンツ】</label>
                            <TextArea type="text" onChange={(e)=>changeChildrenContent(`${node.key}-${node.children.length + 1}`, e.target.value)}/>
                          </div>
                          <div tw="flex flex-col items-start py-2">
                            <input
                              tw="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] font-normal transition duration-300 ease-in-out"
                              type="file"
                              id="formFile"
                              onChange={(e)=>getChildrenImage(`${node.key}-${node.children.length + 1}`, e.target.files[0])} 
                              />
                          </div>
                          <div tw="flex flex-col items-start py-2">
                            <label tw="font-bold mb-1">【画像説明(alt)】</label>
                            <Input type="text" onChange={(e)=>changeChildAlt(`${node.key}-${node.children.length + 1}`, e.target.value)}/>
                          </div>
                      </div>,
                children: [],
              },
            ],
          };
        } 
      }
      return node;
    });
    setTreeData(updatedTreeData);
  };

  const handleDeleteChildren = (key) => {
    // alert(key)
    var data=treeData
    let flag_parent=0;
    for(let i=0;i<data.length;i++){
      if(data[i].key===key){
        flag_parent=1;
      }
    }
    if(flag_parent){
      data = data.filter(item =>item.key !== key)
      setParentTitleValues(parentTitleValues.filter(item=>item.key !== key))
      setParentContentValues(parentContentValues.filter(item=>item.key !== key))
      setParentAlt(parentAlt.filter(item=>item.key !== key))
      setParentImage(parentImage.filter(item=>item.key !== key))
      setParentImageName(parentImageName.filter(item=>item.key !== key))
    }else{
      for(let i=0;i<data.length;i++){
        let flag_child=0;
        for(let j=0;j<data[i].children.length;j++){
          if(data[i].children[j].key===key){
            flag_child=1;
          }
        }
        if(flag_child){
          data[i].children=data[i].children.filter(child =>child.key !== key)
          setChildrenTitleValues(childrenTitleValues.filter(item=>item.key !== key))
          setChildrenContentValues(childrenContentValues.filter(item=>item.key !== key))
          setChildAlt(childAlt.filter(item=>item.key !== key))
          setChildrenImage(childrenImage.filter(item=>item.key !== key))
          setChildrenImageName(childrenImageName.filter(item=>item.key !== key))
        }
      }
      data = data.filter(item =>item.key !== key)
    }
    setTreeData(data);
  }

  const renderTreeNodes = (data) =>
    data.map((node) => (
      <div key={node.key} tw="w-full">
        <div tw="w-full flex">
          <div tw="w-[20%] flex flex-col justify-center items-center p-5">
            {
              !node.key.includes("-") && <button tw="w-[56px] h-[56px] flex flex-col justify-center text-xs text-white rounded-full bg-blue-700 items-center p-1 hover:bg-white hover:text-black hover:border" onClick={() => handleAddChildren(node.key)}>小見出し<IoMdAdd/></button>
            }
            {
              !node.key.includes("-")?<button tw="w-[56px] h-[56px] flex flex-col justify-center text-xs text-white rounded-full bg-red-500 items-center py-1 mt-1 hover:bg-white hover:text-black hover:border" onClick={() => handleDeleteChildren(node.key)}>削除<RiDeleteBin6Line/></button>:<button tw="w-[56px] h-[56px] flex flex-col justify-center text-xs text-white rounded-full bg-red-500 items-center py-1 mt-1 ml-20 hover:bg-white hover:text-black hover:border" onClick={() => handleDeleteChildren(node.key)}>削除<RiDeleteBin6Line/></button>
            }
            
          </div>
          {node.title}
        </div>
        {node.children && node.children.length > 0 && renderTreeNodes(node.children)}
      </div>
    ));



  return(
    <div tw="h-[900px] bg-white text-sm shadow items-center px-10 py-10">
      <div tw="w-full h-full pb-10 overflow-y-auto">
        <div tw="flex w-full justify-center items-center">
          <p tw="text-xl font-bold mx-5">コラム記事登録</p>
        </div>
        <div tw="w-[800px] flex flex-col text-left mx-auto px-20 py-5">
          <div tw="flex flex-col items-start py-2">
              <label tw="font-bold mb-1">【タイトル】<span tw="px-2 text-white rounded-md bg-red-500 text-sm">必須</span></label>
              <Input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
              {validTitle!=="" && <p tw="text-red-500 text-sm">{validTitle}</p>}
          </div>
          <div tw="flex flex-col items-start py-2">
            <label tw="font-bold mb-1">【コンテンツ】<span tw="px-2 text-white rounded-md bg-red-500 text-sm">必須</span></label>
            <TextArea value={description} onChange={(e)=>setDescription(e.target.value)}/>
            {validDescription!=="" && <p tw="text-red-500 text-sm">{validDescription}</p>}
          </div>
          <div tw="flex flex-col items-start py-2">
            <label tw="font-bold mb-1">【カテゴリー】<span tw="px-2 text-white rounded-md bg-red-500 text-sm">必須</span></label>
            <Select tw="w-full" 
              mode="multiple"
              value={columnCategories}
              onChange={ (value) => setColumnCategories(value)}
              options={
                categoryData()
              }
              />
            {validColumnCategory!=="" && <p tw="text-red-500 text-sm">{validColumnCategory}</p>}
          </div>
          <div tw="flex flex-col items-start py-2">
            <label tw="font-bold mb-1">【サムネイル画像】<span tw="px-2 text-white rounded-md bg-red-500 text-sm">必須</span></label>
            <input
              tw="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] font-normal transition duration-300 ease-in-out"
              type="file"
              id="formFile"
              onChange={getThumbnailImage} 
              />
              {validThumbnail!=="" && <p tw="text-red-500 text-sm">{validThumbnail}</p>}
              {imagePreview && (
                <div tw="w-full flex border rounded-md p-1 mt-2 items-center">
                  <img tw="rounded" src={imagePreview} alt="Preview" style={{ maxWidth: '50px' }} />
                  <span tw="mx-2">{thumbnail.name}</span>
                </div>
              )}
          </div>
          <div tw="flex flex-col items-start py-2">
              <label tw="font-bold mb-1">【画像説明(alt)】<span tw="px-2 text-white rounded-md bg-red-500 text-sm">必須</span></label>
              <Input type="text" value={alt} onChange={(e)=>setAlt(e.target.value)}/>
              {validAlt!=="" && <p tw="text-red-500 text-sm">{validAlt}</p>}
          </div>
          <div tw="flex flex-col items-start py-2">
            <button tw='flex items-center text-sm text-white rounded-md bg-blue-700 mx-5 px-5 py-1 hover:bg-white hover:text-black hover:border' onClick={() => handleAddParent()}><IoAddCircleOutline tw="font-bold mr-2" />中見出し追加</button>
          </div>
          {       
            treeData && renderTreeNodes(treeData) 
          }

        </div>
        <div tw="w-full flex justify-center items-center">
          <Link to="/manage/columnmanage" tw="flex items-center text-sm border px-2 py-1 mx-5 rounded-md hover:bg-[#B40100] hover:text-white"><SlArrowLeft tw='mx-1' /> 前に戻る</Link>
          <button tw='flex items-center text-sm text-white rounded-md bg-blue-700 mx-5 px-10 py-1 hover:bg-white hover:text-black hover:border' onClick={handleClickAddColumn}><IoAddCircleOutline tw="font-bold mr-2" />登録</button>
        </div>
      </div>
    </div>
  );
  
};
export default ColumnAddPage;