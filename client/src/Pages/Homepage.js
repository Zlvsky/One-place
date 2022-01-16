import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Styles/homepage.css';
import { AuthLoginInfo } from './../AuthComponents/AuthLogin'
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';

function Homepage(){
  const ctx = useContext(AuthLoginInfo);
  const isAuthenticated = (!(Array.isArray(ctx)))
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/dashboard_data", {
      withCredentials: true
    }).then(res => {
      if(res.data != null) {
        setDashboardData(res.data);
      }
    })
  }, [])

  console.log(dashboardData)


  const TopPanel = () => {
    const todaysDate = new Date().getTime();

    const historyDateRange = (days) => {
      let newDate = new Date();
      newDate.setHours(0,0,0,1);
      newDate.setDate(newDate.getDate() - days);
      return newDate.getTime();
    }

    const [changedDate, setChangedDate] = useState(historyDateRange(0));


    // dokonczyc dzialanie filtrowania tablicy dashboardData z wybrana data
    const dashboardClientsDataFiltered = dashboardData[0]?.filter(item => {
      let itemDate = new Date(item.dataklienta).getTime();
      return changedDate < itemDate && itemDate < todaysDate
    })

    const dashboardDataFiltered = dashboardData[1]?.filter(item => {
      let itemDate = new Date(item.data).getTime();
      return changedDate < itemDate && itemDate < todaysDate
    })

    const getTotalSumOfDateRange = () => {
      if(typeof dashboardDataFiltered === "undefined") {
        return 0
      }
      let totalSum = dashboardDataFiltered?.reduce( (total, value) => {
        return total + value.cena;
      },0);
      return totalSum.toFixed(2);
    }

    const getTotalNewOrdersDateRange = () => {
      if(typeof dashboardDataFiltered === "undefined") {
        return 0
      }
      return dashboardDataFiltered?.length;
    }

    const getTotalNewClientsDateRange = () => {
      if(typeof dashboardDataFiltered === "undefined") {
        return 0
      }
      return dashboardClientsDataFiltered?.length;
    }
  console.log(dashboardDataFiltered, changedDate, todaysDate)


    return (
      <div className="topPanelWrap">
        <div className="topPanelData">
        <div className="topPanelDataBox">
          <div className="topPanelDataIcon">
          <PaymentsRoundedIcon />
          </div>

          <div>
          <p>Przychody</p>
          <h3 className="maincolor" >{getTotalSumOfDateRange()} zł</h3>
          </div>
        </div>
        <div className="topPanelDataBox">
          <div className="topPanelDataIcon">
          <TrendingUpRoundedIcon />
          </div>

          <div>
          <p>Nowe zamówienia</p>
          <h3 className="maincolor" >{getTotalNewOrdersDateRange()}</h3>
          </div>
        </div>
        <div className="topPanelDataBox">
          <div className="topPanelDataIcon">
          <SupervisorAccountRoundedIcon />
          </div>

          <div>
          <p>Nowi klienci</p>
          <h3 className="maincolor" >{getTotalNewClientsDateRange()}</h3>
          </div>
        </div>

        <div className="topPanelDataRangeBox">
          <div className="topPanelDataIcon">
          <EventNoteRoundedIcon />
          </div>
          <select className="dataRangeSelect" onChange={e => setChangedDate(historyDateRange(Number(e.target.value))) }>
            <option defaultValue value="0">Dzisiaj</option>
            <option value="7">7 Dni</option>
            <option value="14">14 Dni</option>
            <option value="30">30 Dni</option>
            <option value="99999">Wszystko</option>
          </select>
        </div>
        </div>


      </div>
    )
  }

  const ChartComponent = () => {

    const getPastMonths = () => {
      const pastMonths = [];
      for (let i = 0; i < 12; i++) {
        const todaysDate = new Date();
        todaysDate.setMonth(todaysDate.getMonth() - i);
        pastMonths.push({
          month: todaysDate.toLocaleString('default', { month: 'long' }),
          firstDay: new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 1),
          lastDay: new Date(todaysDate.getFullYear(), todaysDate.getMonth() + 1, 0),
          totalMonthSum: 0
        })
      }
      return pastMonths;
    }
    const dataBasedOnPastMonths = () => {
      const pastMonthsData = getPastMonths();
      pastMonthsData.forEach((el, i) => {
        el.totalMonthSum = dashboardData[1]?.reduce((total, item) => {
          let itemDate = new Date(item.data);
          if(el.firstDay.getTime() < itemDate.getTime() && itemDate.getTime() < el.lastDay.getTime()) {
            return total + item.cena
          } else {
            return total
          }
        }, 0)
      });
      // const pastMonthsData = dashboardData[1].map(x => ({...x, monthValue: new Data(x.data).getMonth()}))
      // const sumPerMonth = pastMonthsData.reduce((total, item) => {
      //   total[item.monthValue] += item.cena;
      //   return total
      // }, {})
      return pastMonthsData.reverse();

    }

    console.log(dataBasedOnPastMonths())

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
          <Line type="monotone" dataKey="totalMonthSum" stroke="#8884d8" name="Suma z zamówień" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    )
  }

    return (
      <div className="bodyWrap dashboardPage">
        <TopPanel />
        <ChartComponent />
      </div>
    )


}

export default Homepage;
