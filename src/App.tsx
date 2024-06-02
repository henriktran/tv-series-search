import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./components/Home/Home";
import { setupInterceptorsTo } from "./interceptor";

const App: React.FC = () => {
  setupInterceptorsTo(axios);
  return (
    <>
      <ToastContainer />
      <Home />
    </>
  );
};

export default App;
