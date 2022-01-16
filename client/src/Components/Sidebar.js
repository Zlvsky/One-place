import React, { useState, useContext } from 'react';
import './Styles/sidebar.css';
import axios from 'axios';
import { SidebarData } from './SidebarData';
import { NavLink } from 'react-router-dom';
import logo from '../Assets/Images/logo.png';
import { AuthLoginInfo }  from './../AuthComponents/AuthLogin';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const logout = () => {
  axios.get('http://localhost:5000/logout',{
    withCredentials: true
  }).then(res => {
    if(res.data === 'success') {
      window.location.href="/login";
    }
  });
}

function Sidebar() {
  const ctx = useContext(AuthLoginInfo);
  return (
    <div className="SidebarWrapper">
      <div className="navbar">
        <div className="navbarWrap">
          <div className="navbarRow">
          </div>
          <div className="navbarRow">
            { ctx &&
            <div className="userNavbar ">
              <div className="userLogo">
              <AccountCircleRoundedIcon />
              </div>
              <div className="userLogged">
              {ctx.username}
              </div>
              <div onClick={() => {logout()}}>
                <div className="userLogo">
                  <LogoutRoundedIcon />
                </div>
                <div className="logout">
                  Wyloguj
                </div>
              </div>
            </div>
            }
          </div>
        </div>
      </div>
      

    <div className="Sidebar">
      <div className="SidebarLogoWrap">
        <div className="SidebarLogo">
          <img src={logo} className="logo" />
        </div>
      </div>

      <ul className="SidebarList">
      {SidebarData.map((val, key) => {
        return (
         <NavLink to={val.link} key={key} className={({ isActive }) => isActive ? "sidebar-active-link" : "sidebar-link"}>
         <li
             className="SidebarRow">
            <div className="RowIcon">{val.icon}</div>
            <div className="RowTitle">{val.title}</div>
         </li>
         </NavLink>
        )
      })}
      </ul>
    </div>
  </div>
  )
}

export default Sidebar;
