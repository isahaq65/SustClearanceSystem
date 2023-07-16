import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Private from './auth/Private';
import Signup from './pages/Signup'
import DashboardAdmin from './pages/DashboardAdmin';

const App = () => {
   
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard/*" element={<Private  dashboard={ <Dashboard/>} dashboardAdmin={<DashboardAdmin/>}/>}/>
        <Route path="/signin" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />      
      </Routes>
    </BrowserRouter>
  );
};

export default App;
