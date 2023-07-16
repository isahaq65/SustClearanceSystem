import React from 'react';
import { Navigate } from 'react-router-dom';

const Private = ({ dashboard, dashboardAdmin}) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const role = JSON.parse(localStorage.getItem('role'));

  const renderPage =()=>{
    if(token &&  role==="student")
      return dashboard;
    else if (token )
      return dashboardAdmin;
    else {
      return <Navigate to="/signin" /> 

    }
  }
  return token && role==="student"? dashboard: token ? dashboardAdmin: <Navigate to="/signin" /> 
};

export default Private;
