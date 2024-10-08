import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FB_BASE_URL } from "../Constants";

function isObject(o) {
  return o instanceof Object && o.constructor === Object;
}

const GET_TOTAL_INSIGHT_VALUE = (InsightApiResp) => {
  return InsightApiResp.map((item) => {
    return item.values.reduce(
      (a, c) =>
        a +
        (isObject(c.value)
          ? (c.value?.like ? c.value?.like : 0) +
            (c.value?.love ? c.value?.love : 0)
          : c.value),
      0
    );
  }).reduce((a, c) => a + c, 0);
};

const CreateQueryString = (args) => {
  var params = { access_token: args.page_token };
  if (args.range === "range") {
    params.since = args.since;
    if (args.until.length === 10) {
      params.until = args.until;
    }
  } else {
    params.period = "total_over_range";
  }
  const searchParams = new URLSearchParams(params).toString();
  return `${searchParams}`;
};

export const fetchFollowers = createAsyncThunk(
  "FB_INSIGHTS/fetchFollowers",
  async (args, thunkAPI) => {
    const queryString = CreateQueryString(args);
    let Url = `${FB_BASE_URL}/${args.page_id}?fields=followers_count,fan_count&${queryString}`;
    const apiData = await fetch(Url);
    const apiDataJson = await apiData.json();
    return apiDataJson;
  }
);

export const fetchEngagements = createAsyncThunk(
  "FB_INSIGHTS/fetchEngagements",
  async (args, thunkAPI) => {
    const queryString = CreateQueryString(args);
    let Url = `${FB_BASE_URL}/${args.page_id}/insights/page_post_engagements?${queryString}`;
    const apiData = await fetch(Url);
    const { data } = await apiData.json();
    const totalEngagements = GET_TOTAL_INSIGHT_VALUE(data);
    return totalEngagements;
  }
);
export const fetchImpressions = createAsyncThunk(
  "FB_INSIGHTS/fetchImpressions",
  async (args, thunkAPI) => {
    const queryString = CreateQueryString(args);
    let Url = `${FB_BASE_URL}/${args.page_id}/insights/page_impressions_unique?${queryString}`;
    const apiData = await fetch(Url);
    const { data } = await apiData.json();
    const totalImpressions = GET_TOTAL_INSIGHT_VALUE(data);
    return totalImpressions;
  }
);
export const fetchReactions = createAsyncThunk(
  "FB_INSIGHTS/fetchReactions",
  async (args, thunkAPI) => {
    const queryString = CreateQueryString(args);
    let Url = `${FB_BASE_URL}/${args.page_id}/insights/page_actions_post_reactions_total?${queryString}`;
    const apiData = await fetch(Url);
    const { data } = await apiData.json();
    const totalReactions = GET_TOTAL_INSIGHT_VALUE(data);
    return totalReactions;
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
