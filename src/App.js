import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Test from "./pages/Test";
import Navbar from "./pages/Navbar";
import 'react-bootstrap';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/test' element={<Test/>}/>
      </Routes>
    </div>
  );
}

export default App;
