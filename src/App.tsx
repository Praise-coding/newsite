import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./Dashboard";
import IDGenerator from "./IDGenerator";
import SignUp from "./SignUp";

function App() {

  return (
    <IDGenerator>
      <ToastContainer position="top-center"/>
      <BrowserRouter>
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </IDGenerator>
  );
}

export default App;
