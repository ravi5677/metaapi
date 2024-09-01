import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEngagements,
  fetchFollowers,
  fetchImpressions,
  fetchReactions,
} from "../Store/PageInsightSlice.";

const PageDropdown = () => {
  const [showRange, setShowRange] = useState("total_over_range");
  const [sinceDate, setsinceDate] = useState("");
  const [untilDate, setUntilDate] = useState("");
  const dispatch = useDispatch();
  const originalState = useSelector((store) => store.FB_GRAPH);
  const [selPage, setSelPage] = useState(null);
  const pageList = originalState.pages;

  const handleSubmitDrodown = () => {
    const params = { range: showRange, since: sinceDate, until: untilDate };
    // const queryString = new URLSearchParams(params).toString();
    if (showRange === "range" && !sinceDate) {
      alert("Please select Since date to view insights");
      return;
    }
    if (selPage.length) {
      const PageArr = pageList.filter((item) => {
        return item.page_id == selPage;
      });
      const selectedPage = PageArr[0];
      dispatch(fetchFollowers({ ...params, ...selectedPage }));
      dispatch(fetchImpressions({ ...params, ...selectedPage }));
      dispatch(fetchEngagements({ ...params, ...selectedPage }));
      dispatch(fetchReactions({ ...params, ...selectedPage }));
    } else {
      alert("Please select a page to view insights");
      return;
    }
  };
  return (
    <>
      {pageList.length != 0 && (
        <div className="dropdownPageContainer">
          <div className="dropdownPage">
            <div>
              <label htmlFor="" className="labelBox">
                Select Page
              </label>
              <select
                id="dropdown"
                onChange={(e) => {
                  setSelPage(e.target.value);
                }}
              >
                <option value="">--SELECT HERE--</option>
                {pageList.map((item) => {
                  return (
                    <option value={item.page_id} key={item.page_id}>
                      {item.page_name.toUpperCase()}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="" className="labelBox">
                Select Period
              </label>
              <select
                id="dropdown"
                onChange={(e) => {
                  setShowRange(e.target.value);
                }}
              >
                <option value="total_over_range">TOTAL OVER RANGE</option>
                <option value="range">RANGE</option>
              </select>
            </div>
            {showRange === "range" && (
              <div className="dateRange">
                <div>
                  <label htmlFor="" className="labelBox">
                    Since
                  </label>
                  <input
                    type="date"
                    className="inputBox"
                    value={sinceDate}
                    onChange={(e) => setsinceDate(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="" className="labelBox">
                    Until
                  </label>
                  <input
                    type="date"
                    className="inputBox"
                    value={untilDate}
                    onChange={(e) => setUntilDate(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div className="dropdownBtnContainer">
              <button className="dropdownBtn" onClick={handleSubmitDrodown}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PageDropdown;
