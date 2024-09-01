import { useState } from "react";
import "./App.css";
import Navbar from "./pages/Navbar";
import { useSelector } from "react-redux";

function App() {
  const originalState = useSelector((store) => store.FB_GRAPH);
  console.log(originalState);
  const [selPage, setSelPage] = useState({});
  const pageList = originalState.pages;

  const handleSubmitDrodown = () => {
    const selectedPage = pageList.filter((item) => {
      return item.page_id == selPage;
    });
    console.log(selectedPage);
  };
  return (
    <>
      <Navbar />
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
    </>
  );
}

export default App;
