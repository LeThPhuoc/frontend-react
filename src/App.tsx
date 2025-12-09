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
import { ProjectDetail } from './pages/project/projectDetail';
import { NavBar } from './components/NavBar';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  const location = useLocation()
  return (
    <>
      <AlertProvider>
        {(isAuthenticated || location.state) && (
          <NavBar />
        )}
        <div css={css`
          /* width: ${(isAuthenticated || location.state) ? 'calc(100% - 250px)' : '100%'}; */
          margin: 40px auto 0px auto;
          max-width: 1200px;
        `}>
          <Routes>
            <Route path="/login" element={<LoginOrRegister />} />
            <Route element={<AuthThenticatedRoute isAuthenticated={(isAuthenticated || location.state)} />}>
              <Route path="/staff" element={<Staff />} />
              <Route path="/project" element={<Project />} />
              <Route path="/project/:id/detail" element={<ProjectDetail />} />
            </Route>
          </Routes>
        </div>
      </AlertProvider>
    </>
  );
}

const flex = css`
  display: flex;
`

export default App;
