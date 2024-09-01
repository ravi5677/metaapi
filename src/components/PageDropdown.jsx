import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEngagements,
  fetchFollowers,
  fetchImpressions,
  fetchReactions,
} from "../Store/PageInsightSlice.";

const PageDropdown = () => {
  const dispatch = useDispatch();
  const originalState = useSelector((store) => store.FB_GRAPH);
  const [selPage, setSelPage] = useState({});
  const pageList = originalState.pages;

  const handleSubmitDrodown = () => {
    if (selPage) {
      const PageArr = pageList.filter((item) => {
        return item.page_id == selPage;
      });
      const selectedPage = PageArr[0];
      dispatch(fetchFollowers(selectedPage));
      dispatch(fetchImpressions(selectedPage));
      // dispatch(fetchReactions(selectedPage));
      dispatch(fetchEngagements(selectedPage));
    } else {
      alert("Please select a page to view insights");
    }
  };
  return (
    <div className="dropdownPageContainer">
      <div className="dropdownPage">
        <select
          name="dropdown"
          id="dropdown"
          onChange={(e) => {
            setSelPage(e.target.value);
          }}
        >
          <option value="">Select A Page</option>
          {pageList.map((item) => {
            return (
              <option value={item.page_id} key={item.page_id}>
                {item.page_name}
              </option>
            );
          })}
        </select>
        <button className="dropdownBtn" onClick={handleSubmitDrodown}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default PageDropdown;
