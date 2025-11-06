/** @jsxImportSource @emotion/react */
import React from 'react';
import './App.css';
import { LoginOrRegister } from './pages/loginOrRegister/LoginOrRegisterForm'
import { Route, Routes, useLocation } from 'react-router-dom';
import { SideBar } from './components/SideBar';
import { css } from '@emotion/react';
import { Staff } from './pages/staff/staff';
import { AuthThenticatedRoute } from './route/authThenticatedRoute';
import { Project } from './pages/project/project';
import { AlertProvider } from './components/Alert/AlertProvider';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  const location = useLocation()
  return (
    <>
      <AlertProvider>
        <div css={flex}>
          {(isAuthenticated || location.state) && (
            <SideBar />
          )}
          <div css={css`
          width: ${(isAuthenticated || location.state) ? 'calc(100% - 250px)' : '100%'};
        `}>
            <Routes>
              <Route path="/login" element={<LoginOrRegister />} />
              <Route element={<AuthThenticatedRoute isAuthenticated={(isAuthenticated || location.state)} />}>
                <Route path="/staff" element={<Staff />} />
                <Route path="/project" element={<Project />} />
              </Route>
            </Routes>
          </div>
        </div>
      </AlertProvider>
    </>
  );
}

const flex = css`
  display: flex;
`

export default App;
