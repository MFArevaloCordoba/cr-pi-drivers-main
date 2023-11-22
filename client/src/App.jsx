// //componentes a renderizar
// import LandingPage from './components/landingpage/landingPage';



// //dependencias

// import React from 'react';
// import axios from 'axios';

// //hooks

// import { Route, Routes,useLocation,useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';

// //style
// import './App.css'
import { Route, Routes } from "react-router-dom";

import Home from "./components/homepage/homepage";
import Detail from "./components/detail/detail";
import Landing from "./components/landingpage/landingPage";
import Create from "./components/formulario/form";
import Update from './components/Actualizar/update';

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;




