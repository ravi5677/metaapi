import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  FB_APP_ID,
  FB_APP_SECRET,
  FB_BASE_URL,
  API_VERSION,
  FB_UID,
  FB_ACCESS_TOKEN,
} from "../Constants";

const FB_DATA_URL = `${FB_BASE_URL}/${API_VERSION}`;

const PAGE_ID = "500064973487193";
const PAGE_TOKEN =
  "EAAHHGUwrrZAABOxrj8I5L4qsZB0HIsFAIXvZAkHxuTecFZBS5X1MbRuKiLyinss9iJZCdTeGaRfM6UUkm1DZBONMlSuMgAPPzb6ZAc4BxBK03IHMC9sUXk0FAhkzHOMemZCbqPsVB7rhZC1bjFKgqvoGg5XbXoino2Q8DZAJFFwMI2vU3S0TpqWVk4BzKpNaqYIuEu";

export const fetchFollowers = createAsyncThunk(
  "FB_INSIGHTS/fetchFollowers",
  async (args, thunkAPI) => {
    let Url = `${FB_BASE_URL}/${PAGE_ID}?fields=followers_count,fan_count&period=total_over_range&access_token=${PAGE_TOKEN}`;
    const apiData = await fetch(Url);
    const apiDataJson = await apiData.json();
    console.log("fetchFollowers", apiDataJson);
    return apiDataJson;
  }
);

export const fetchEngagements = createAsyncThunk(
  "FB_INSIGHTS/fetchEngagements",
  async (args, thunkAPI) => {
    let Url = `${FB_BASE_URL}/${PAGE_ID}/insights?metric=page_engaged_users&period=total_over_range&access_token=${PAGE_TOKEN}`;
    const apiData = await fetch(Url);
    const apiDataJson = await apiData.json();
    console.log("fetchEngagements", apiDataJson);
    return apiDataJson;
  }
);
export const fetchImpressions = createAsyncThunk(
  "FB_INSIGHTS/fetchImpressions",
  async (args, thunkAPI) => {
    let Url = `${FB_BASE_URL}/${PAGE_ID}/insights?metric=page_impressions&period=total_over_range&access_token=${PAGE_TOKEN}`;
    const apiData = await fetch(Url);
    const apiDataJson = await apiData.json();
    console.log("fetchImpressions", apiDataJson);
    return apiDataJson;
  }
);
export const fetchReactions = createAsyncThunk(
  "FB_INSIGHTS/fetchReactions",
  async (args, thunkAPI) => {
    let Url = `${FB_BASE_URL}/${PAGE_ID}/insights?metric=page_actions_post_reactions_total&period=total_over_range&access_token=${PAGE_TOKEN}`;
    const apiData = await fetch(Url);
    const apiDataJson = await apiData.json();
    console.log("fetchReactions", apiDataJson);
    return apiDataJson;
  }
);

const PageInsightSlice = createSlice({
  name: "FB_INSIGHTS",
  initialState: {
    totalFollowers: 0,
    totalFans: 0,
    totalEngagements: 0,
    totalImpressions: 0,
    totalReactions: 0,
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
