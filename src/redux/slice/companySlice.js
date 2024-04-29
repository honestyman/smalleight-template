import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allCompanyList: [],
  matchCompanies: [],
  matchToolCompanies: [],
  oneCompany: {},
  selectedCompany: [],
  allCampaignList: [],
  allExpertiseList: [],
  allToolsList: [],
  allSolvedissueList: [],
  allPricesenceList: [],
  allStartDateList: [],
  allIndustryExperienceList: [],
  postSelectedOneCompanyResultMessage:"",
  postSelectedCompanysResultMessage:"",
  postSelectedMultifulCompanyResultMessage:""
}

export const getCompanyList = createAsyncThunk(
  "all/companies",
  async (payload) => {
    const res = await axios.get(`${process.env.REACT_APP_API}/companys/`);
    return res.data;
  }
)
export const findingCompany = createAsyncThunk(
  "post/answers",
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

    console.log(token);

    const res = await axios.post(
      `${process.env.REACT_APP_API}/companys/answers`,
      payload,
      { headers }
    );

    return res.data;
  }
)

export const deleteOneCompany = createAsyncThunk(
  "onedelete/companies",
  async (Id) => {
    const res = await axios.delete(process.env.REACT_APP_API+"/companys/deleteonecompany?id="+Id);
    // console.log("--------",res.data);
    return res.data;
  }
)

export const postSelectedCompanys = createAsyncThunk(
  "post/selectedcompanies",
  async (payload) => {
    console.log(payload)
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

    // console.log(token);

    const res = await axios.post(
      `${process.env.REACT_APP_API}/companys/selected_companise`,
      payload,
      { headers }
    );
    return res.data;
  }
)

export const postSelectedOneCompany = createAsyncThunk(
  "post/selectedonecompanies",
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
      `${process.env.REACT_APP_API}/companys/add_selected_onecompany`,
      payload,
      { headers }
    );
    return res.data;
  }
)

export const postSelectedMultifulCompany = createAsyncThunk(
  "post/selectedmultifulcompanies",
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
      `${process.env.REACT_APP_API}/companys/add_selected_multifulcompany`,
      payload,
      { headers }
    );
    return res.data;
  }
)

export const findingTool = createAsyncThunk(
  "post/answers_tool",
  async (payload) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/companys/answers_tool`, payload);
    // console.log(111, res.data)
    return res.data;
  }
)
export const getOneCompany = createAsyncThunk(
  "one/company",
  async (Id) => {
    const res = await axios.get(`${process.env.REACT_APP_API}/companys/onecompany`,{
      params:{
        id:Id
      }
    });
    return res.data;
  }
)
export const getSelectedCompany = createAsyncThunk(
  "one/selected_company",
  async (Ids) => {
    const res = await axios.get(`${process.env.REACT_APP_API}/companys/selected_company`,{
      params:{
        ids:Ids
      }
    });
    return res.data;
  }
)

export const getCampaignList = createAsyncThunk(
  "get_allcampaign/companies",
  async (payload) => {
    const res = await axios.get(`${process.env.REACT_APP_API}/companys/allcampaign`);
    return res.data;
  }
)
export const getExpertiseList = createAsyncThunk(
  "get_allexpertise/companies",
  async (payload) => {
    const res = await axios.get(`${process.env.REACT_APP_API}/companys/allexpertise`);
    return res.data;
  }
)
export const getToolsList = createAsyncThunk(
  "get_alltools/companies",
  async (payload) => {
    const res = await axios.get(`${process.env.REACT_APP_API}/companys/alltools`);
    return res.data;
  }
)
export const getSolvedissueList = createAsyncThunk(
  "get_allsolvedissue/companies",
  async (payload) => {
    const res = await axios.get(`${process.env.REACT_APP_API}/companys/allsolvedissue`);
    return res.data;
  }
)
export const getPricesenceList = createAsyncThunk(
  "get_allpricesence/companies",
  async (payload) => {
    const res = await axios.get(`${process.env.REACT_APP_API}/companys/allpricesence`);
    return res.data;
  }
)
export const getStartDateList = createAsyncThunk(
  "get_allstartdate/companies",
  async (payload) => {
    const res = await axios.get(`${process.env.REACT_APP_API}/companys/allstartdate`);
    return res.data;
  }
)
export const getIndustryExperienceList = createAsyncThunk(
  "get_allindustryexperience/companies",
  async (payload) => {
    const res = await axios.get(`${process.env.REACT_APP_API}/companys/allindustryexperience`);
    return res.data;
  }
)

export const addCompany = createAsyncThunk(
  "post/addcompanies",
  async (payload) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/companys/addcompany`,payload);
      console.log("======>",res);
      // return res.data;  
    } catch (error) {
      alert(error.response.data.message)
      // console.error(error.response.data);
    }
    
  }
)
export const updateCompany = createAsyncThunk(
  "post/updatecompanies",
  async (payload) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/companys/updatecompany`,payload);
      console.log("======>",res);
      return res.data;  
    } catch (error) {
      // console.error(error.response.data);
    }
    
  }
)

export const addCompanyLogo = createAsyncThunk(
  "logo/addcompanies",
  async (logo) => {
      const formData=new FormData();
      formData.append('file',logo);
      formData.append('fileName',logo.name);
      // console.log("111", formData)
      const config={
        headers:{
          'content-type':'multipart/form-data',
        },
      };  
      axios.post(process.env.REACT_APP_API+"/upload/add_logoimage", formData, config)
      .then((response) => {
        return response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error uploading files: ", error);
      });
  }
)

// export const addCompanyLogo = createAsyncThunk(
//   "logo/addcompanies",
//   async (logo) => {
//       const formData=new FormData();
//       formData.append('file',logo);
//       formData.append('fileName',logo.name);
//       // console.log("111", formData)
//       const config={
//         headers:{
//           'content-type':'multipart/form-data',
//         },
//       };  
//       axios.post(process.env.REACT_APP_API+"/upload/add_logoimage", formData, config)
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("Error uploading files: ", error);
//       });
//   }
// )


export const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers:{
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyList.fulfilled, (state, action) => {
        state.allCompanyList = [...action.payload];
      })
      .addCase(findingCompany.fulfilled, (state, action) => {
        state.matchCompanies = [...action.payload];
      })
      .addCase(findingTool.fulfilled, (state, action) => {
        state.matchToolCompanies = [...action.payload];
      })
      .addCase(getOneCompany.fulfilled, (state, action) => {
        state.oneCompany = {...action.payload};
      })
      .addCase(getSelectedCompany.fulfilled, (state, action) => {
        state.selectedCompany = [...action.payload];
      })
      .addCase(postSelectedOneCompany.fulfilled, (state, action) => {
        state.postSelectedOneCompanyResultMessage = action.payload.message;
      })
      .addCase(postSelectedCompanys.fulfilled, (state, action) => {
        state.postSelectedCompanysResultMessage = action.payload.message;
      })
      .addCase(postSelectedMultifulCompany.fulfilled, (state, action) => {
        state.postSelectedMultifulCompanyResultMessage = action.payload.message;
      })
      .addCase(getCampaignList.fulfilled, (state, action) => {
        state.allCampaignList = [...action.payload];
      })
      .addCase(getExpertiseList.fulfilled, (state, action) => {
        state.allExpertiseList = [...action.payload];
      })
      .addCase(getToolsList.fulfilled, (state, action) => {
        state.allToolsList = [...action.payload];
      })
      .addCase(getSolvedissueList.fulfilled, (state, action) => {
        state.allSolvedissueList = [...action.payload];
      })
      .addCase(getPricesenceList.fulfilled, (state, action) => {
        state.allPricesenceList = [...action.payload];
      })
      .addCase(getStartDateList.fulfilled, (state, action) => {
        state.allStartDateList = [...action.payload];
      })
      .addCase(getIndustryExperienceList.fulfilled, (state, action) => {
        state.allIndustryExperienceList = [...action.payload];
      })
  }
});

// export const { resetUserStore, resetMessage } = userSlice.actions;
export default companySlice.reducer;