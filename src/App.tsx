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
import { CheckLogList } from './pages/checkLog/CheckLogList';
import { CheckLogPage } from './pages/checkLog/CheckLogPage';

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
          background-color: ${isAuthenticated ? '#e9e9e9' : '#ffffff'};
          height: calc(100vh - 40px);
        `}>
          <div css={css`
            margin: ${isAuthenticated ? '40px auto 0px auto' : '0px auto'};
            max-width: ${!isAuthenticated ? '100%' : '1200px'};
            background-color: white;
            height: 100%;
          `}>
            <Routes>
              <Route path="/login" element={<LoginOrRegister />} />
              <Route element={<AuthThenticatedRoute isAuthenticated={(isAuthenticated || location.state)} />}>
                <Route path="/staff" element={<Staff />} />
                <Route path="/project" element={<Project />} />
                <Route path="/project/:id/detail" element={<ProjectDetail />} />
                <Route path="checkin_list" element={<CheckLogList />} />
                <Route path="checkin_page/:id" element={<CheckLogPage />} />
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
