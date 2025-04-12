import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import React from 'react'
import HomePage from "./pages/HomePage/HomePage";
import ResponsePage from "./pages/ResponsePage/ResponsePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path="/response" element={<ResponsePage/>}/>
      </Routes>
    </Router>
  )
}

export default App
