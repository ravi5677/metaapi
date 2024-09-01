import { useSelector } from "react-redux";
import FacebookLogin from "./pages/FacebookLogin";

function App() {
  const FB_GRAPH_DATA = useSelector((state) => state.FB_GRAPH);
  console.log(FB_GRAPH_DATA);
  return (
    <>
      <FacebookLogin />
    </>
  );
}

export default App;
