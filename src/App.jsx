import { useSelector } from "react-redux";
import "./App.css";
import PageDropdown from "./components/PageDropdown";
import Navbar from "./pages/Navbar";
import InsightCard from "./components/InsightCard";

function App() {
  const FB_INSIGHTS = useSelector((store) => store.FB_INSIGHTS);
  console.log(FB_INSIGHTS);
  return (
    <>
      <Navbar />
      <PageDropdown />
      {FB_INSIGHTS.map((item, key) => {
        return <InsightCard key={key} CardTitle={key} TitleValue={item} />;
      })}
    </>
  );
}

export default App;
