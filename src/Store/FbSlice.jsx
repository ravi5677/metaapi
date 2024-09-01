import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FB_BASE_URL, API_VERSION } from "../Constants";

const FB_DATA_URL = `${FB_BASE_URL}/${API_VERSION}`;

export const fetchProfileData = createAsyncThunk(
  "FB_GRAPH/fetchProfileData",
  async (args, thunkAPI) => {
    const state = thunkAPI.getState();
    let Url = `${FB_DATA_URL}/${state.FB_GRAPH.userID}?fields=id,name,email,picture&access_token=${state.FB_GRAPH.accessToken}`;
    const apiData = await fetch(Url);
    const apiDataJson = await apiData.json();
    return apiDataJson;
  }
);
export const fetchPageList = createAsyncThunk(
  "FB_GRAPH/fetchPageList",
  async (args, thunkAPI) => {
    const state = thunkAPI.getState();
    let Url = `${FB_DATA_URL}/${state.FB_GRAPH.userID}/accounts?access_token=${state.FB_GRAPH.accessToken}`;
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
      return {
        ...state,
        accessToken: action.payload.accessToken,
        userID: action.payload.userID,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileData.fulfilled, (state, action) => {
      return { ...state, userProfile: action.payload };
    });
    builder.addCase(fetchPageList.fulfilled, (state, action) => {
      return {
        ...state,
        pages: action.payload,
      };
    });
  },
});
export default FbSlice;
export const { setSecretToken } = FbSlice.actions;
