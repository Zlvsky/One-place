import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Login from './Pages/Login';
import Orders from './Pages/Orders';
import OrderPage from './Pages/OrderPage';
import Clients from './Pages/Clients';
import ClientPage from './Pages/ClientPage';
import CalendarEvents from './Pages/CalendarEvents';
import AdminPanel from './Pages/AdminPanel';
import PrivateRoute  from './AuthComponents/PrivateRoute';
import LoginRoute  from './AuthComponents/LoginRoute';
import AdminRoute  from './AuthComponents/AdminRoute';
import Sidebar from './Components/Sidebar';
import { AuthLoginInfo }  from './AuthComponents/AuthLogin';



function App() {
    const ctx = useContext(AuthLoginInfo);
    console.log(ctx)
    return (
      <BrowserRouter>
        <Sidebar>
          </Sidebar>
            <Routes>
              <Route path='/' exact element={
                  <PrivateRoute>
                    <Homepage />
                  </PrivateRoute>
                } />
              <Route path='/orders' element={
                    <PrivateRoute>
                      <Orders />
                    </PrivateRoute>
                  } />
                <Route path='/orders/:orderId' element={
                    <PrivateRoute>
                      <OrderPage />
                    </PrivateRoute>
                  } />
                <Route path='/clients' element={
                    <PrivateRoute>
                      <Clients />
                    </PrivateRoute>
                  } />
                <Route path='/clients/:clientId' element={
                    <PrivateRoute>
                      <ClientPage />
                    </PrivateRoute>
                  } />
                <Route path='/calendar' element={
                    <PrivateRoute>
                      <CalendarEvents />
                    </PrivateRoute>
                  } />
                <Route path='/adminPannel' element={
                    <AdminRoute>
                      <AdminPanel />
                    </AdminRoute>
                  } />
              <Route path='/login' element={
                  <LoginRoute>
                    <Login />
                  </LoginRoute>
                } />
            </Routes>
      </BrowserRouter>
    );
}

export default App;
