import { useState } from "react";
import "./App.css";
import Navbar from "./pages/Navbar";
import { useSelector } from "react-redux";

function App() {
  const originalState = useSelector((store) => store.FB_GRAPH);
  console.log(originalState);
  const [selectedPageData, setSelectedPageData] = useState({});
  const pageList = originalState.pages;

  const handleSubmitDrodown = () => {};
  return (
    <>
      <Navbar />
      <div className="dropdownPageContainer">
        <div className="dropdownPage">
          <select
            name="dropdown"
            id="dropdown"
            onChange={(e) => {
              setSelectedPageData(e.target.value);
            }}
          >
            <option value="">Select A Page</option>
            {pageList.map((item) => {
              return (
                <option value={item.id} key={item.id}>
                  {item.name}
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
