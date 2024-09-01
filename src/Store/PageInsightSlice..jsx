import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FB_BASE_URL, API_VERSION } from "../Constants";

const FB_DATA_URL = `${FB_BASE_URL}/${API_VERSION}`;

export const fetchFollowers = createAsyncThunk(
  "FB_INSIGHTS/fetchFollowers",
  async (args, thunkAPI) => {
    let Url = `${FB_BASE_URL}/${args.page_id}?fields=followers_count,fan_count&period=total_over_range&access_token=${args.page_token}`;
    const apiData = await fetch(Url);
    const apiDataJson = await apiData.json();
    return apiDataJson;
  }
);

export const fetchEngagements = createAsyncThunk(
  "FB_INSIGHTS/fetchEngagements",
  async (args, thunkAPI) => {
    let Url = `${FB_BASE_URL}/${args.page_id}/insights/page_post_engagements?access_token=${args.page_token}`;
    const apiData = await fetch(Url);
    const apiDataJson = await apiData.json();
    console.log("fetchEngagements", apiDataJson);
    return apiDataJson;
  }
);
export const fetchImpressions = createAsyncThunk(
  "FB_INSIGHTS/fetchImpressions",
  async (args, thunkAPI) => {
    let Url = `${FB_BASE_URL}/${args.page_id}/insights/page_impressions_unique?access_token=${args.page_token}`;
    const apiData = await fetch(Url);
    const { data } = await apiData.json();
    const totalImpressions = data
      .map((item) => {
        return item.values.reduce((a, c) => a + c.value, 0);
      })
      .reduce((a, c) => a + c, 0);
    console.log("fetchImpressions", totalImpressions);
    return totalImpressions;
  }
);
export const fetchReactions = createAsyncThunk(
  "FB_INSIGHTS/fetchReactions",
  async (args, thunkAPI) => {
    let Url = `${FB_BASE_URL}/${args.page_id}/insights?metric=page_actions_post_reactions_total&period=total_over_range&access_token=${args.page_token}`;
    const apiData = await fetch(Url);
    const apiDataJson = await apiData.json();
    console.log("fetchReactions", apiDataJson);
    return apiDataJson;
  }
);

const PageInsightSlice = createSlice({
  name: "FB_INSIGHTS",
  initialState: {
    totalFollowers: null,
    totalFans: null,
    totalEngagements: null,
    totalImpressions: null,
    totalReactions: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFollowers.fulfilled, (state, action) => {
      return {
        ...state,
        totalFollowers: action.payload.followers_count,
        totalFans: action.payload.fan_count,
      };
    });
    builder.addCase(fetchEngagements.fulfilled, (state, action) => {
      return { ...state, totalEngagements: action.payload };
    });
    builder.addCase(fetchImpressions.fulfilled, (state, action) => {
      return { ...state, totalImpressions: action.payload };
    });
    builder.addCase(fetchReactions.fulfilled, (state, action) => {
      return { ...state, totalReactions: action.payload };
    });
  },
});
export default PageInsightSlice;
