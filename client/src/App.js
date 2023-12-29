import { Navigate, Route,Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashbordPage from "./pages/DashbordPage";
import TransactionPage from "./pages/TransactionPage";
import "./App.css";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoutes><HomePage/></ProtectedRoutes>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/dashboard" element={ <DashbordPage/> } />
        <Route path="/transaction" element={ <TransactionPage/> } />
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props){
  if (localStorage.getItem("user")){
    return props.children;
  } else {
    return <Navigate to="/login"/>;
  }

}

export default App;
