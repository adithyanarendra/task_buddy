import React from 'react';

import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import TasksHome from "./components/TasksHome";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/tasks" element={<TasksHome />} />
      </Routes>
    </Router>
  );
}

export default App
