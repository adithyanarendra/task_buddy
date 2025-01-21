import React from 'react';

import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import TaskHome from './pages/Home/Home';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<TaskHome />} />
      </Routes>
    </Router>
  );
}

export default App
