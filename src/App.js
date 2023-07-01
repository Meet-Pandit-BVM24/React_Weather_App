import './App.css';
import React from 'react';
import AirPollution from './components/AirPollution';
import Header from './components/Header';
import Show from './components/Show';

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AirPollution />} />
          <Route exact path="/AirPollution" element={<AirPollution />} />
          <Route exact path="/Weather" element={<Show />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
