import React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import ContentPasteRoundedIcon from '@mui/icons-material/ContentPasteRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
export const SidebarData = [
  {
    title: "Dashboard",
    icon: <HomeRoundedIcon />,
    link: "/"
  },
  {
    title: "Login",
    icon: <LoginRoundedIcon />,
    link: "/login"
  },
  {
    title: "Zamówienia",
    icon: <ContentPasteRoundedIcon />,
    link: "/zamowienia"
  },
  {
    title: "Klienci",
    icon: <PeopleOutlineRoundedIcon />,
    link: "/klienci"
  },
  {
    title: "Kalendarz",
    icon: <TodayRoundedIcon />,
    link: "/kalendarz"
  }
];
