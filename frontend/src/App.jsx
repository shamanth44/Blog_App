import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import BlogLayout from "./Components/BlogLayout";
import Signup from "./pages/Signup";
import AllBLogs from "./Components/AllBLogs";
import CreateBlog from "./pages/CreateBLog";
import Signin from "./pages/Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import SingleBlog from "./Components/SingleBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<AllBLogs />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/signin" element={<Signin />}/>
          <Route path="/create-blog" element={<CreateBlog />}/>
          <Route path="/blog/:id" element={<SingleBlog/>}/>
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </>
  );
}

export default App;
