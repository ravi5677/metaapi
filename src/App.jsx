import { useSelector } from "react-redux";
import "./App.css";
import PageDropdown from "./components/PageDropdown";
import Navbar from "./pages/Navbar";
import InsightCard from "./components/InsightCard";

function App() {
  const FB_INSIGHTS = useSelector((store) => store.FB_INSIGHTS);
  return (
    <>
      <Navbar />
      <PageDropdown />
      <div className="insightBox">
        {Object.keys(FB_INSIGHTS).map((item) => {
          return (
            <InsightCard CardTitle={item} TitleValue={FB_INSIGHTS[item]} />
          );
        })}
      </div>
    </>
  );
}

export default App;
