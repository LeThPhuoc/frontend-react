/** @jsxImportSource @emotion/react */
import React from 'react';
import './App.css';
import { Login } from './pages/loginAndRegister/LoginAndRegisterForm'
import { Route, Routes } from 'react-router-dom';
import { SideBar } from './components/SideBar';
import { css } from '@emotion/react';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <>
      <div css={flex}>
        {isAuthenticated && (
          <SideBar />
        )}
        <div css={css`
          width: ${isAuthenticated ? 'calc(100% - 250px)' : '100%'};
        `}>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        </div>
      </div>
    </>
  );
}

const flex = css`
  display: flex;
`

export default App;
