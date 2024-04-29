import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  authtoken: {},
}

export const getAuth = createAsyncThunk(
  "auth/getuser",
  async (payload) => {
    const { adminName, password } = payload;
    const secretKey = process.env.REACT_APP_SECRETKEY;
    const tokenPayload =`${adminName}:${password}`;
    const encodedTokenPayload = btoa(tokenPayload);
    const token=`${encodedTokenPayload}.${secretKey}`;
    console.log(token);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(`${process.env.REACT_APP_API}/auth/`,
      payload,
      { headers }
    );
    return res.data;
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuth.fulfilled, (state, action) => {
        state.authtoken = {...action.payload};
      })
      // .addCase(updatePassword.fulfilled, (state, action) => {
      //   state.userInfo = { ...action.payload.user };
      //   state.message.status = 200;
      //   state.message.content = action.payload.message;
      // })
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
export default authSlice.reducer;