import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allColumnList: [],
  allColumnCategoryList: [],
  oneColumnData: {},
}

export const getColumnList = createAsyncThunk(
  "all/columns",
  async (payload) => {
    const res = await axios.get(`${process.env.REACT_APP_API}/columns/`);
    return res.data;
  }
)
export const getColumnCategoryList = createAsyncThunk(
  "all/columns_category",
  async (payload) => {
    const res = await axios.get(`${process.env.REACT_APP_API}/columns/allcategory`);
    return res.data;
  }
)
export const getOneColumn = createAsyncThunk(
  "one/column",
  async (Id) => {
    console.log("--------",Id);
    const res = await axios.get(`${process.env.REACT_APP_API}/columns/onecolumn`,{
      params:{
        id:Id
      }
    });
    console.log(Id, res.data)
    return res.data;
  }
)

export const addColumn = createAsyncThunk(
  "post/addcolumns",
  async (payload) => {
    console.log(payload);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/columns/addcolumn`, payload);
      console.log("======>",res);
      // return res.data;  
    } catch (error) {
      alert(error.response.data.message)
      // console.error(error.response.data);
    }
    
  }
)

export const updateColumn = createAsyncThunk(
  "post/updatecolumns",
  async (payload) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/columns/updatecolumn`, payload);
      console.log("======>",res);
      // return res.data;  
    } catch (error) {
      alert(error.response.data.message)
      // console.error(error.response.data);
    }
    
  }
)

export const deleteOneColumn = createAsyncThunk(
  "onedelete/columns",
  async (Id) => {
    console.log(Id);
    const res = await axios.delete(process.env.REACT_APP_API+"/columns/deleteonecolumn?id="+Id);
    // console.log("--------",res.data);
    return res.data;
  }
)

export const addColumnThumbnail = createAsyncThunk(
  "thumbnail/addcolumns",
  async (thumbnail) => {
      const formData=new FormData();
      formData.append('file',thumbnail);
      formData.append('fileName',thumbnail.name);
      // console.log("111", formData)
      const config={
        headers:{
          'content-type':'multipart/form-data',
        },
      };  
      axios.post(process.env.REACT_APP_API+"/upload/add_columnthumbnail", formData, config)
      .then((response) => {
        return response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error uploading files: ", error);
      });
  }
)

export const addColumnFirstImage = createAsyncThunk(
  "firstimage/addcolumns",
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
      axios.post(process.env.REACT_APP_API+"/upload/add_columnfirstimage", formData, config)
      .then((response) => {
        return response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error uploading files: ", error);
      });
  }
)

export const addColumnSecondImage = createAsyncThunk(
  "secondimage/addcolumns",
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
      axios.post(process.env.REACT_APP_API+"/upload/add_columnsecondimage", formData, config)
      .then((response) => {
        return response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error uploading files: ", error);
      });
  }
)

export const columnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers:{
  },
  extraReducers: (builder) => {
    builder
      .addCase(getColumnList.fulfilled, (state, action) => {
        state.allColumnList = [...action.payload];
      })
      .addCase(getColumnCategoryList.fulfilled, (state, action) => {
        state.allColumnCategoryList = [...action.payload];
      })
      .addCase(getOneColumn.fulfilled, (state, action) => {
        state.oneColumnData = {...action.payload};
      })
  }
});

// export const { resetUserStore, resetMessage } = userSlice.actions;
export default columnSlice.reducer;