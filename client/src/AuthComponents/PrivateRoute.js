import React, { useContext, useEffect } from 'react';
import { AuthLoginInfo } from './AuthLogin';
import { Navigate } from 'react-router-dom';
import './Styles/loadingPage.css';

function PrivateRoute({ children }) {
  const user = useContext(AuthLoginInfo);
  if(user === undefined) {
    return (
      <div className="loading-page-wrapper">
        <div className="loading-page">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }
  // zrobić navigate z loginu kiedy jest sie zalogowanym
  return user ? children : <Navigate to="/login" />;

}
export default PrivateRoute
