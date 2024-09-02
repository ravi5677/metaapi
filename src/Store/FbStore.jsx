import { configureStore } from "@reduxjs/toolkit";
import FbSlice from "./FbSlice";
import PageInsightSlice from "./PageInsightSlice";

const FbStore = configureStore({
  reducer: {
    FB_GRAPH: FbSlice.reducer,
    FB_INSIGHTS: PageInsightSlice.reducer,
  },
});
export default FbStore;
