import "@/App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <h1>
      <Link to={"/auth/login"}>App</Link>
    </h1>
  );
}

export default App;
