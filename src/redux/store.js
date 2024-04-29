import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./slice/companySlice";
import columnReducer from "./slice/columnSlice";
import authReducer from "./slice/authSlice";
import clientReducer from "./slice/clientSlice";
import newsReducer from "./slice/newsSlice";

export default configureStore({
  reducer: {
    companies: companyReducer,
    columns: columnReducer,
    auth: authReducer,
    clients: clientReducer,
    news: newsReducer
  }
});