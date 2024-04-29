import { createSlice, createAsyncThunk, ReducerType } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  clientList: [],
  postQueryResultMessage: "",
  deletedResultMessage: "",
  postWantedResultMessage: "",
  oneClientData: {}
}

export const getClientList = createAsyncThunk(
  "all/clients",
  async (payload) => {
    const res = await axios.get(`${process.env.REACT_APP_API}/clients/`);
    return res.data;
  }
)

export const postQuery = createAsyncThunk(
  "postquery/clients",
  async (payload) => {
    const { name, email } = payload;
    const secretKey = process.env.REACT_APP_SECRETKEY;

    // Concatenate the username and email with a colon
    const tokenPayload = `${name}:${email}`;

    // Encode the token payload using Base64
    const encodedTokenPayload = btoa(tokenPayload);

    // Concatenate the encoded token payload with the secretKey
    const token = `${encodedTokenPayload}.${secretKey}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res = await axios.post(
      `${process.env.REACT_APP_API}/clients/postquery`,
      payload,
      { headers }
    );
    return res.data;
  }
)

export const getOneClient = createAsyncThunk(
  "one/client",
  async (Id) => {
    console.log("--------",Id);
    const res = await axios.get(`${process.env.REACT_APP_API}/clients/getoneclient`,{
      params:{
        id:Id
      }
    });
    return res.data;
  }
)

export const deleteOneClient = createAsyncThunk(
  "onedelete/client",
  async (Id) => {
    const res = await axios.delete(process.env.REACT_APP_API+"/clients/deleteoneclient?id="+Id);
    // console.log("--------",res.data);
    return res.data;
  }
)

export const postWanted = createAsyncThunk(
  "postwanted/clients",
  async (payload) => {
    const { name, email } = payload;
    const secretKey = process.env.REACT_APP_SECRETKEY;

    // Concatenate the username and email with a colon
    const tokenPayload = `${name}:${email}`;

    // Encode the token payload using Base64
    const encodedTokenPayload = btoa(tokenPayload);

    // Concatenate the encoded token payload with the secretKey
    const token = `${encodedTokenPayload}.${secretKey}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res = await axios.post(
      `${process.env.REACT_APP_API}/clients/postwanted`,
      payload,
      { headers }
    );
    return res.data;
  }
)

export const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers:{
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClientList.fulfilled, (state, action) => {
        state.clientList = [...action.payload];
      })
      .addCase(postQuery.fulfilled, (state, action) => {
        state.postQueryResultMessage = action.payload.message;
      })
      .addCase(getOneClient.fulfilled, (state, action) => {
        state.oneClientData = {...action.payload};
      })
      .addCase(deleteOneClient.fulfilled, (state, action) => {
        state.deletedResultMessage = action.payload.message;
      })
      .addCase(postWanted.fulfilled, (state, action) => {
        state.postWantedResultMessage = action.payload.message;
      })
      // .addCase(updatePassword.rejected, (state, action) => {
      //   state.message.status = 401;
      //   state.message.content = action.error.message;
      //   state.updatePasswordErrorMessage = 'パスワードが正しくありません。';
      // })
      // .addCase(loginWithToken.fulfilled, (state, action) => {
      //   state.userInfo = { ...action.payload.payload.user };
      //   state.token = action.payload.payload.token;
      //   localStorage.setItem("token", action.payload.payload.token);
      // })
  }
});

// export const { resetUserStore, resetMessage } = userSlice.actions;
export default clientSlice.reducer;