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
import OpenRoute from "./Components/OpenRoute";
import PrivateRoute from "./Components/PrivateRoute";
import ScrollToTop from "./Components/ScrollToTop";
import UserProfile from "./Components/UserProfile";
import AuthorProfile from "./Components/AuthorProfile";

function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop/>
        <Navbar />
        <Routes>
          <Route path="/" element={<AllBLogs />}/>
          <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>}/>
          <Route path="/signin" element={<OpenRoute><Signin /></OpenRoute>}/>
          <Route path="/create-blog" element={<PrivateRoute><CreateBlog /></PrivateRoute>}/>
          <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>}/>
          <Route path="/blog-author/:authorId" element={<AuthorProfile />}/>
          <Route path="/blog/:id" element={<SingleBlog/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
