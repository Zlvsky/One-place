import React, { useState } from "react";
import "./Styles/adminPanel.css";
import UsersSetting from "./../Components/AdminPanelComponents/UsersSetting";
import ConfigureSetting from "./../Components/AdminPanelComponents/ConfigureSetting";

function AdminPanel() {
  const [selectedSetting, setSelectedSetting] = useState(0);
  const componentsMap = {
    usersSetting: UsersSetting,
  };
  const adminNavData = [
    {
      id: 0,
      title: "Users",
      component: "usersSetting",
    },
  ];

  const CalendarWrap = (props) => {
    return (
      <div className="adminPanelWrap">
        <div className="adminPanelHeader">
          <h1>Admin pannel</h1>
        </div>
        {props.children}
      </div>
    );
  };

  const AdminPanelNav = () => {
    return (
      <div className="adminNav">
        <ul className="adminNavList">
          {adminNavData.map((val) => {
            return (
              <li
                key={val.id}
                className={`adminNavItem ${
                  selectedSetting === val.id ? "active-setting" : ""
                }`}
                onClick={() => setSelectedSetting(val.id)}
              >
                {val.title}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const ContentWrap = (props) => {
    return (
      <div className="contentWrap">
        {adminNavData.map((val) => {
          if (val.id === selectedSetting) {
            const Component = componentsMap[val.component];
            return <Component key={val.id} />;
          }
        })}
      </div>
    );
  };

  return (
    <div className="bodyWrap">
      <CalendarWrap>
        <AdminPanelNav />
        <ContentWrap />
      </CalendarWrap>
    </div>
  );
}

export default AdminPanel;
