import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allNewsList: [],
  // allColumnCategoryList: [],
  oneNewsData: {},
}

export const getNewsList = createAsyncThunk(
  "all/news",
  async (payload) => {
    const res = await axios.get(`${process.env.REACT_APP_API}/news/`);
    return res.data;
  }
)

export const addNews = createAsyncThunk(
  "post/addnews",
  async (payload) => {
    console.log(payload);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/news/addnews`, payload);
      console.log("======>",res);
      // return res.data;  
    } catch (error) {
      alert(error.response.data.message)
      // console.error(error.response.data);
    }
    
  }
)

export const updateNews = createAsyncThunk(
  "post/updatenews",
  async (payload) => {
    console.log(payload);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/news/updatenews`, payload);
      console.log("======>",res);
      // return res.data;  
    } catch (error) {
      alert(error.response.data.message)
      // console.error(error.response.data);
    }
    
  }
)

export const addNewsImage = createAsyncThunk(
  "image/addnews",
  async (image) => {
      const formData=new FormData();
      formData.append('file',image);
      formData.append('fileName',image.name);
      // console.log("111", formData)
      const config={
        headers:{
          'content-type':'multipart/form-data',
        },
      };  
      axios.post(process.env.REACT_APP_API+"/upload/add_newsimage", formData, config)
      .then((response) => {
        return response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error uploading files: ", error);
      });
  }
)

export const addNewsChildImage = createAsyncThunk(
  "childimage/addnews",
  async (file) => {
      const formData=new FormData();
      formData.append('file',file);
      formData.append('fileName',file.name);
      // console.log("111", formData)
      const config={
        headers:{
          'content-type':'multipart/form-data',
        },
      };  
      axios.post(process.env.REACT_APP_API+"/upload/add_newschildimage", formData, config)
      .then((response) => {
        return response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error uploading files: ", error);
      });
  }
)

export const getOneNews = createAsyncThunk(
  "one/news",
  async (Id) => {
    console.log("--------",Id);
    const res = await axios.get(`${process.env.REACT_APP_API}/news/onenews`,{
      params:{
        id:Id
      }
    });
    console.log(Id, res.data)
    return res.data;
  }
)

export const deleteOneNews = createAsyncThunk(
  "onedelete/news",
  async (Id) => {
    console.log(Id);
    const res = await axios.delete(process.env.REACT_APP_API+"/news/deleteonenews?id="+Id);
    // console.log("--------",res.data);
    return res.data;
  }
)

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers:{
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewsList.fulfilled, (state, action) => {
        state.allNewsList = [...action.payload];
      })
      // .addCase(getColumnCategoryList.fulfilled, (state, action) => {
      //   state.allColumnCategoryList = [...action.payload];
      // })
      .addCase(getOneNews.fulfilled, (state, action) => {
        state.oneNewsData = {...action.payload};
      })
  }
});

// export const { resetUserStore, resetMessage } = userSlice.actions;
export default newsSlice.reducer;