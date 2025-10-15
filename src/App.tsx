import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './pages/login/Login'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
