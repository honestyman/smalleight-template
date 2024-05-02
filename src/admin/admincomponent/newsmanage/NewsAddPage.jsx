
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { IoAddCircleOutline } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";

import { Input, message } from "antd";

import { useDispatch, useSelector } from 'react-redux';
import TextArea from "antd/es/input/TextArea";
import { addNews, addNewsChildImage, addNewsImage } from "../../../redux/slice/newsSlice";


// It's just a simple demo. You can use tree map to optimize update perf.
const NewsAddPage=()=>{

  const dispatch = useDispatch();

  const [parentTitleValues, setParentTitleValues] = useState([]);
  const [parentContentValues, setParentContentValues] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [parentImage, setParentImage] = useState([]);
  const [parentImageName, setParentImageName] = useState([]);
  const [parentImagePreview, setParentImagePreview] = useState([]);
  const [childImagePreview, setChildImagePreview] = useState([]);

  const [parent, setParent]=useState("")
  
  const [validTitle, setValidTitle] = useState("");
  const [validContents, setValidContents] = useState("");
  const [validThumbnail, setValidThumbnail] = useState("");

  useEffect(() => {
    // const filePath = URL.createObjectURL(logo);
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setImagePreview(null);
    }

  },[image]);

  const getThumbnailImage = async(e) => {
    // setLogo(e.target.files[0]);
    var file=e.target.files[0]
    
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
    
    if (!isJpgOrPng) {
      message.error('アップロードできる画像はJPG/PNG/WEBPのみです！');
      // setFileFlag(false);
    }
    if(isJpgOrPng){
      setImage(file);
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
    }
  }


  // useEffect(() =>{
  //   console.log(parentTitleValues)
  // },[parentTitleValues])

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

  const handleClickAddColumn =()=>{
    if(!title){
      setValidTitle("※この項目は必須入力項目です。")
    }else{
      setValidTitle("")
    }
    if(!contents){
      setValidContents("※この項目は必須入力項目です。")
    }else{
      setValidContents("")
    }
    if(!image){
      setValidThumbnail("※この項目は必須入力項目です。")
    }else{
      setValidThumbnail("")
    }

    if(title && contents && image){
      const payload={
        title: title,
        contents: contents,
        firstTitleValues: parentTitleValues.sort(function(a, b) {
          return a.key.localeCompare(b.key);
        }),
        firstContentValues: parentContentValues.sort(function(a, b) {
          return a.key.localeCompare(b.key);
        }), 
        firstImageName: parentImageName.sort(function(a, b) {
          return a.key.localeCompare(b.key);
        }),
        image: image.name   
      }
      if(payload){
        dispatch(addNews(payload)).then(()=>{
          alert("正確に登録されています！");  
          if(image){
             dispatch(addNewsImage(image));
          }
          if(parentImage){            
            for(let i=0; i<parentImage.length; i++){
              dispatch(addNewsChildImage(parentImage[i].image))
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
            title: <div className="w-[90%] flex flex-col">
                      <div className="flex flex-col items-start py-2">
                        <label className="font-bold mb-1">【中見出し】</label>
                        <Input type="text" onChange={(e)=>changeParentTitle((parseInt(treeData[treeData.length-1 ].key)+1).toString(), e.target.value)} />
                      </div>
                      <div className="flex flex-col items-start py-2">
                        <label className="font-bold mb-1">【コンテンツ】</label>
                        <TextArea type="text" onChange={(e)=>changeParentContent((parseInt(treeData[treeData.length-1 ].key)+1).toString(), e.target.value)}/>
                      </div>
                      <div className="flex flex-col items-start py-2">
                        <input
                          className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] font-normal transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white file:dark:text-white"
                          type="file"
                          id="formFile"
                          onChange={(e)=>getParentImage((parseInt(treeData[treeData.length-1 ].key)+1).toString(), e.target.files[0])} 
                          />
                      </div>
                   </div>
          } 
        ])
      }
    }else{
      setTreeData(
        [
          {
            key: "1",
            title: <div className="w-[90%] flex flex-col">
                      <div className="flex flex-col items-start py-2">
                        <label className="font-bold mb-1">【中見出し】</label>
                        <Input type="text" onChange={(e)=>changeParentTitle("1", e.target.value)}/>
                      </div>
                      <div className="flex flex-col items-start py-2">
                        <label className="font-bold mb-1">【コンテンツ】</label>
                        <TextArea type="text" onChange={(e)=>changeParentContent("1", e.target.value)}/>
                      </div>
                      <div className="flex flex-col items-start py-2">
                        <input
                          className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] font-normal transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white file:dark:text-white"
                          type="file"
                          id="formFile"
                          onChange={(e)=>getParentImage("1", e.target.files[0])} 
                          />
                      </div>
                   </div>
          }
        ]
      )
    }
  }

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
      setParentImage(parentImage.filter(item=>item.key !== key))
      setParentImageName(parentImageName.filter(item=>item.key !== key))
    }
    setTreeData(data);
  }

  const renderTreeNodes = (data) =>
    data.map((node) => (
      <div key={node.key} className="w-full">
        <div className="w-full flex">
          <div className="w-[20%] flex flex-col justify-center items-center p-5">
            <button className={`w-14 h-14 flex flex-col justify-center text-xs text-white rounded-full bg-red-500 items-center py-1 mt-1 hover:bg-white hover:text-black hover:border`} onClick={() => handleDeleteChildren(node.key)}>削除<RiDeleteBin6Line/></button>
          </div>
          {node.title}
        </div>
      </div>
    ));

  return(
    <div className={`-webkit-fill-available h-[900px] bg-white text-sm shadow items-center px-10 py-10 `}>
      <div className="w-full h-full pb-10 overflow-y-auto">
        <div className="flex w-full justify-center items-center">
          <p className="text-xl font-bold mx-5">ニュース登録</p>
        </div>
        <div className="w-[800px] flex flex-col text-left mx-auto px-20 py-5">
          <div className="flex flex-col items-start py-2">
              <label className="font-bold mb-1">【タイトル】<span className="px-2 text-white rounded-md bg-red-500 text-sm">必須</span></label>
              <Input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
              {validTitle!=="" && <p className="text-red-500 text-sm">{validTitle}</p>}
          </div>
          <div className="flex flex-col items-start py-2">
            <label className="font-bold mb-1">【コンテンツ】<span className="px-2 text-white rounded-md bg-red-500 text-sm">必須</span></label>
            <TextArea value={contents} onChange={(e)=>setContents(e.target.value)}/>
            {validContents!=="" && <p className="text-red-500 text-sm">{validContents}</p>}
          </div>
          <div className="flex flex-col items-start py-2">
            <label className="font-bold mb-1">【画像】<span className="px-2 text-white rounded-md bg-red-500 text-sm">必須</span></label>
            <input
              className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] font-normal transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white file:dark:text-white"
              type="file"
              id="formFile"
              onChange={getThumbnailImage} 
              />
              {validThumbnail!=="" && <p className="text-red-500 text-sm">{validThumbnail}</p>}
              {imagePreview && (
                <div className="w-full flex border rounded-md p-1 mt-2 items-center">
                  <img className="rounded" src={imagePreview} alt="Preview" style={{ maxWidth: '50px' }} />
                  <span className="mx-2">{image.name}</span>
                </div>
              )}
          </div>
          <div className="flex flex-col items-start py-2">
            <button className='flex items-center text-sm text-white rounded-md bg-blue-700 mx-5 px-5 py-1 hover:bg-white hover:text-black hover:border' onClick={() => handleAddParent()}><IoAddCircleOutline className="font-bold mr-2" />中見出し追加</button>
          </div>
          {       
            treeData && renderTreeNodes(treeData) 
          }

        </div>
        <div className="w-full flex justify-center items-center">
          <Link to="/manage/newsmanage" className="flex items-center text-sm border px-2 py-1 mx-5 rounded-md hover:bg-[#B40100] hover:text-white"><SlArrowLeft className='mx-1' /> 前に戻る</Link>
          <Link className='flex items-center text-sm text-white rounded-md bg-blue-700 mx-5 px-10 py-1 hover:bg-white hover:text-black hover:border' onClick={handleClickAddColumn}><IoAddCircleOutline className="font-bold mr-2" />登録</Link>
        </div>
      </div>
    </div>
  );
  
};
export default NewsAddPage;