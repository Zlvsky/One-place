import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Styles/homepage.css";
import { AuthLoginInfo } from "./../AuthComponents/AuthLogin";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import ContentPasteRoundedIcon from "@mui/icons-material/ContentPasteRounded";

function Homepage() {
  const ctx = useContext(AuthLoginInfo);
  const isAuthenticated = !Array.isArray(ctx);
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/dashboard_data", { withCredentials: true })
      .then((res) => {
        if (res.data != null) {
          setDashboardData(res.data);
        }
      });
  }, []);

  const TopPanel = () => {
    const todaysDate = new Date().getTime();
    const historyDateRange = (days) => {
      let newDate = new Date();
      newDate.setHours(0, 0, 0, 1);
      newDate.setDate(newDate.getDate() - days);
      return newDate.getTime();
    };
    const [changedDate, setChangedDate] = useState(historyDateRange(0));
    const [selectedDateToText, setSelectedDateToText] = useState("today");

    // dokonczyc dzialanie filtrowania tablicy dashboardData z wybrana data
    const dashboardClientsDataFiltered = dashboardData[0]?.filter((item) => {
      let itemDate = new Date(item.clientDateCreated).getTime();
      return changedDate < itemDate && itemDate < todaysDate;
    });

    const dashboardDataFiltered = dashboardData[1]?.filter((item) => {
      let itemDate = new Date(item.date).getTime();
      return changedDate < itemDate && itemDate < todaysDate;
    });

    const getTotalSumOfDateRange = () => {
      if (typeof dashboardDataFiltered === "undefined") {
        return 0;
      }
      let totalSum = dashboardDataFiltered?.reduce((total, value) => {
        return total + value.price;
      }, 0);
      return totalSum.toFixed(2);
    };

    const getTotalNewOrdersDateRange = () => {
      if (typeof dashboardDataFiltered === "undefined") {
        return 0;
      }
      return dashboardDataFiltered?.length;
    };

    const getTotalNewClientsDateRange = () => {
      if (typeof dashboardDataFiltered === "undefined") {
        return 0;
      }
      return dashboardClientsDataFiltered?.length;
    };

    const dateRangeToText = (dateNumber) => {
      if (dateNumber === 0) {
        setSelectedDateToText("today");
      } else if (dateNumber > 100) {
        setSelectedDateToText("whole period");
      } else {
        setSelectedDateToText(`${dateNumber} days`);
      }
    };

    const upcomingEventDateText = (date) => {
      let todaysDate = new Date().toISOString().split("T")[0];
      let tommorowDate = new Date();
      tommorowDate.setDate(tommorowDate.getDate() + 1);
      let tommorowDateToCompare = tommorowDate.toISOString().split("T")[0];
      let eventDate = date.split("T")[0];
      if (eventDate === todaysDate) {
        return "Today";
      } else if (eventDate === tommorowDateToCompare) {
        return "Tommorow";
      } else {
        return eventDate;
      }
    };

    const UpcomingEvents = () => {
      let upcomingEventsExist = false;
      if (dashboardData[2] === undefined || dashboardData[2].length === 0) {
        upcomingEventsExist = false;
      } else {
        upcomingEventsExist = true;
      }
      return upcomingEventsExist ? (
        dashboardData[2]?.map((event) => {
          let dateText = upcomingEventDateText(event.deadlineDate);
          return (
            <div className="upcomingEventWrap" key={event.id}>
              <div className="upcomingEventDate">
                <span>-{dateText} </span>
                <span>{event.hours}</span>
              </div>
              <div className="upcomingEventTitle">
                <span>{event.title}</span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="upcomingEventWrap">
          <span>There are no upcoming events</span>
        </div>
      );
    };

    return (
      <div className="topPanelWrap">
        <div className="topPanelDataRangeBox">
          <h3>Show data from selected period</h3>
          <div className="topPanelDataIcon">
            <EventNoteRoundedIcon />
          </div>
          <select
            className="dataRangeSelect"
            onChange={(e) => {
              setChangedDate(historyDateRange(Number(e.target.value)));
              dateRangeToText(Number(e.target.value));
            }}
          >
            <option defaultValue="defaultValue" value="0">
              Today
            </option>
            <option value="7">7 Days</option>
            <option value="14">14 Days</option>
            <option value="30">30 Days</option>
            <option value="99999">All</option>
          </select>
        </div>

        <div className="topPanelData">
          <div className="topPanelDataBox">
            <div className="topPanelDataIcon">
              <PaymentsRoundedIcon />
            </div>

            <div className="topPanelDataSummary">
              <p>Income</p>
              <h3 className="maincolor topPanelDataText">
                {getTotalSumOfDateRange()}
                zł
              </h3>
            </div>

            <div className="topPanelSeperator"></div>
            <div>
              <span className="topPanelBottomText">
                From {selectedDateToText}
              </span>
            </div>
          </div>

          <div className="topPanelDataBox">
            <div className="topPanelDataIcon">
              <TrendingUpRoundedIcon />
            </div>

            <div className="topPanelDataSummary">
              <p>New orders</p>
              <h3 className="maincolor topPanelDataText">
                {getTotalNewOrdersDateRange()}
              </h3>
            </div>

            <div className="topPanelSeperator"></div>
            <div>
              <span className="topPanelBottomText">
                <Link to="/orders" className="maincolor">
                  + Create new order
                </Link>
              </span>
            </div>
          </div>

          <div className="topPanelDataBox">
            <div className="topPanelDataIcon">
              <SupervisorAccountRoundedIcon />
            </div>

            <div className="topPanelDataSummary">
              <p>New clients</p>
              <h3 className="maincolor topPanelDataText">
                {getTotalNewClientsDateRange()}
              </h3>
            </div>

            <div className="topPanelSeperator"></div>
            <div>
              <span className="topPanelBottomText">
                <Link to="/clients" className="maincolor">
                  + Add new client
                </Link>
              </span>
            </div>
          </div>

          <div className="topPanelDataBox">
            <div className="topPanelDataIcon topPanelHeaderInline">
              <ContentPasteRoundedIcon />
              <span>Upcoming events</span>
            </div>

            <UpcomingEvents />

            <div className="topPanelSeperator"></div>
            <div>
              <span className="topPanelBottomText">
                <Link to="/calendar" className="maincolor">
                  See more events
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ChartComponent = () => {
    const getPastMonths = () => {
      const pastMonths = [];
      for (let i = 0; i < 12; i++) {
        const todaysDate = new Date();
        todaysDate.setMonth(todaysDate.getMonth() - i);
        pastMonths.push({
          month: todaysDate.toLocaleString("default", { month: "long" }),
          firstDay: new Date(
            todaysDate.getFullYear(),
            todaysDate.getMonth(),
            1
          ),
          lastDay: new Date(
            todaysDate.getFullYear(),
            todaysDate.getMonth() + 1,
            0
          ),
          totalMonthSum: 0,
        });
      }
      return pastMonths;
    };
    const dataBasedOnPastMonths = () => {
      const pastMonthsData = getPastMonths();
      pastMonthsData.forEach((el, i) => {
        el.totalMonthSum = dashboardData[1]?.reduce((total, item) => {
          let itemDate = new Date(item.date);
          if (
            el.firstDay.getTime() < itemDate.getTime() &&
            itemDate.getTime() < el.lastDay.getTime()
          ) {
            return total + item.price;
          } else {
            return total;
          }
        }, 0);
      });
      return pastMonthsData.reverse();
    };

    return (
      <ResponsiveContainer width="100%" height="50%">
        <LineChart
          width={500}
          height={300}
          data={dataBasedOnPastMonths()}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalMonthSum"
            stroke="#8884d8"
            name="Orders sum"
            activeDot={{
              r: 8,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="bodyWrap dashboardPage">
      <TopPanel />
      <ChartComponent />
    </div>
  );
}

export default Homepage;
