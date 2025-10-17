import React from 'react';
import './App.css';
import { Login } from './pages/loginAndRegister/LoginAndRegisterForm'
import { Route, Routes } from 'react-router-dom';
import { SideBar } from './components/SideBar';

function App() {
  return (
    <>
      <div>
        <SideBar/>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
