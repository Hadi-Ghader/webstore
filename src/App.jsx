import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import SignUp from "./components/signup/Signup";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Products from "./components/products/products";
import Contactus from "./components/Contact Us/Contactus";
import Aboutus from "./components/About Us/Aboutus";
import Home from "./components/Home/home";
import AdminPanel from "./components/Admin Panel/AdminPanel.jsx";
import MyLogin from "./components/login/MyLogin";
import Footer from "./components/Footer/footer.jsx"

function App() {


  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/login" element={<MyLogin />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/adminpanel" element={<AdminPanel />} />
          </Routes>
        </div>
      </div>
      </BrowserRouter>
  );
}

export default App;
