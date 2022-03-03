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

  const NavbarSection = () => {
    return (
    <div className="navbar">
      <div className="navbarWrap">
        <div className="navbarRow">
        </div>
        <div className="navbarRow">

          { //if user is logged in
            ctx &&
          <div className="userNavbar ">
            <div className="userLogo">
            <AccountCircleRoundedIcon />
            </div>
            <div className="userLogged">
            Logged as: {ctx.username}
            </div>
            <div className="navbarFlex" onClick={() => {logout()}}>
              <div className="userLogo">
                <LogoutRoundedIcon className="maincolor clickable"/>
              </div>
              <div className="logout clickable">
                Logout
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

  const SidebarSection = () => {
    return (
    <div className="Sidebar">
      <div className="SidebarLogoWrap">
        <div className="SidebarLogo">
          <img src={logo} className="logo" />
        </div>
      </div>

      <ul className="SidebarList">
      {SidebarData.map((val, key) => {
        let hideElement = false;
        if (val?.role != undefined && val?.role != ctx?.role) {
          return null;
        }
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
  )
}

  return (
    <div className="SidebarWrapper">
      <NavbarSection />
      <SidebarSection />
    </div>
  )
}

export default Sidebar;
