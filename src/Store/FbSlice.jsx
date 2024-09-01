import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FB_BASE_URL, API_VERSION } from "../Constants";

const FB_DATA_URL = `${FB_BASE_URL}/${API_VERSION}`;

/*
export const fetchToken = createAsyncThunk(
  "FB_GRAPH/fetchToken",
  async (args, thunkAPI) => {
    const state = thunkAPI.getState();
    let Url = `${FB_BASE_URL}/oauth/access_token?client_id=${FB_APP_ID}&client_secret=${FB_APP_SECRET}&grant_type=client_credentials`;
    const apiData = await fetch(Url);
    const apiDataJson = await apiData.json();
    return apiDataJson.access_token;
  }
);

export const fetchUserId = createAsyncThunk(
  "FB_GRAPH/fetchUserId",
  async (args, thunkAPI) => {
    let Url = `${FB_DATA_URL}/me?fields=id&access_token=${FB_ACCESS_TOKEN}`;
    const apiData = await fetch(Url);
    const apiDataJson = await apiData.json();
    return apiDataJson.id;
  }
);
*/
export const fetchProfileData = createAsyncThunk(
  "FB_GRAPH/fetchProfileData",
  async (args, thunkAPI) => {
    let Url = `${FB_DATA_URL}/${FB_UID}?fields=id,name,email,picture&access_token=${FB_ACCESS_TOKEN}`;
    const apiData = await fetch(Url);
    const apiDataJson = await apiData.json();
    return apiDataJson;
  }
);
export const fetchPageList = createAsyncThunk(
  "FB_GRAPH/fetchPageList",
  async (args, thunkAPI) => {
    let Url = `${FB_DATA_URL}/${FB_UID}/accounts?access_token=${FB_ACCESS_TOKEN}`;
    const apiData = await fetch(Url);
    const { data } = await apiData.json();
    const pageList = data.map((item) => ({
      page_id: item.id,
      page_name: item.name,
      page_token: item.access_token,
    }));
    return pageList;
  }
);

const FbSlice = createSlice({
  name: "FB_GRAPH",
  initialState: {
    accessToken: null,
    userID: null,
    userProfile: {},
    pages: [],
  },
  reducers: {
    setSecretToken: (state, action) => {
      console.log(action, state);
      return {
        ...state,
        accessToken: action.payload.accessToken,
        userID: action.payload.userID,
      };
    },
  },
  extraReducers: (builder) => {
    /*builder.addCase(fetchToken.fulfilled, (state, action) => {
      return { ...state, secretToken: action.payload };
    });
    builder.addCase(fetchUserId.fulfilled, (state, action) => {
      return { ...state, userId: action.payload };
    });*/
    builder.addCase(fetchProfileData.fulfilled, (state, action) => {
      return { ...state, userProfile: action.payload };
    });
    builder.addCase(fetchPageList.fulfilled, (state, action) => {
      return {
        ...state,
        pages: action.payload,
        secretToken: FB_ACCESS_TOKEN,
        userId: FB_UID,
      };
    });
  },
});
export default FbSlice;
export const { setSecretToken } = FbSlice.actions;
