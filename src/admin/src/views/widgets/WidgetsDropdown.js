import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CWidgetStatsF
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions, cilChartPie, cilDollar, cilDiamond } from '@coreui/icons'
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";

import imgBTC from '../../assets/images/pay_btc.png'
import imgCard from '../../assets/images/pay_card.png'
import imgCSGO from '../../assets/images/pay_csgo.png'
import imgKeys from '../../assets/images/pay_keys.png'
import imgSteam from '../../assets/images/pay_steam.png'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import { format } from 'date-fns'
import { Spinner } from 'react-bootstrap'
import baseUrl from '../../Constants'
import { useNavigate } from 'react-router-dom'
import Charts from './Charts'
import Tables from './Tables'
import './widgets.css'


const WidgetsDropdown = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [users, setUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [copyData, setCopyData] = useState([]);
  // const [startDate, setStartDateDate] = useState();
  // const [endDate, setEndDateDate] = useState();
  // const [newUsersPerDayCount, setNewUsersPerDayCount] = useState([]);
  // const [totalDeposit, setTotalDeposit] = useState(0);
  const [allTransactions, setAllTransactions] = useState({
    tf2: {
      balance: 0
    },
    gems: {
      balance: 0
    },
    csgo: {
      balance: 0
    },
    card: {
      balance: 0
    },
    crypto: {
      balance: 0
    },
  });
  const [totalOrdersCopy, setTotalOrdersCopy] = useState([]);
  const [totalOrders, setTotalOrders] = useState([]);
  const [totalOngoingTickets, setTotalOngoingTickets] = useState([]);
  // const [totalDepositsAffiliates, setTotalDepositsAffiliates] = useState(0);
  // const [totalDepositsAffiliatesSeperated, setTotalDepositsAffiliatesSeperated] = useState([]);

  const [startDate, endDate] = dateRange;

  const navigate = useNavigate();

  // const handleNavigate = (name, label, data) => {
  //   const object = {
  //     widget: name,
  //     label,
  //     data
  //   }
  //   navigate("/dashboard/details", { state: object });
  // };

  const dates = [];

  const header = {
    headers: {
      'x-auth-token': JSON.parse(localStorage.getItem('ADtoken'))
    }
  };

  for (let i = 0; i < format(new Date(), "dd"); i++) {
    dates[i] = i + 1;
  };



  // const getUserCountForEveryDate = (newUsers) => {

  //   let arr = [];

  //   dates.forEach((item) => {

  //     const userOnThisdate = newUsers.filter((element) => {
  //       return format(new Date(element.createdat), "dd") == item;
  //     });

  //     arr[item - 1] = userOnThisdate.length;

  //   });

  //   // setNewUsersPerDayCount([...arr]);
  // };


  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}auth/allusers`, header);
      setUsers(data);

      const currentMonth = format(new Date(), "MM");

      const currentMonthUsers = data?.filter((element) => {
        return format(new Date(element.createdat), "MM") == currentMonth;
      });


      setNewUsers(currentMonthUsers);
      setCopyData(currentMonthUsers);

      // getUserCountForEveryDate(data);

    } catch (ex) {
      setIsLoading(false);
      console.error("error -----------", ex.response.data);

      if (ex.response.data === "Token Expired") {
        localStorage.removeItem("ADtoken");
        window.location.reload();
      };

    };

    fetchTransactions();
    fetchOrders();
    fetchTickets();
    // fetchLinkClicksAndAccCreated();

  };

  function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
  };

  const calculateTotalBalance = (transactions) => {

    const obj = {
      tf2: {
        balance: 0
      },
      gems: {
        balance: 0
      },
      csgo: {
        balance: 0
      },
      card: {
        balance: 0
      },
      crypto: {
        balance: 0
      }
    };

    transactions.forEach((transaction) => {
      // console.log(transaction.type);

      if (transaction.type == "Bonus Site Credit (Card)") {
        obj.card.balance += Math.abs(transaction.price);
      };

      if (transaction.type == "Bonus Site Credit (Crypto)") {
        obj.crypto.balance += transaction.price;
      };

      if (transaction.type == "card" || transaction.type == "crypto") {
        obj[transaction.type].balance += transaction.price;
      };

    });

    setAllTransactions({ ...obj });

  };

  const fetchTransactions = async () => {
    const url = baseUrl + "transactions/all?userdata=true";

    try {
      const { data } = await axios.get(url, header);
      calculateTotalBalance(data);

    } catch (ex) {
      console.log(ex);

    };
  };

  const filterTotalOrders = (dates) => {

    const startDate = dates[0];
    const endDate = dates[1];

    const startDateDay = new Date(startDate.toDateString()).getDate();
    const endDateDay = new Date(endDate.toDateString()).getDate();

    startDate.setDate(startDateDay);
    endDate.setDate(endDateDay + 1);

    const filteredData = totalOrdersCopy.filter(element => {
      return new Date(element.date) > dates[0] && new Date(element.date) < dates[1];
    });

    endDate.setDate(endDateDay);

    setTotalOrders(filteredData);

  };

  const filterNewUsers = (dates) => {


    if (dates[0] && dates[1]) {
      const startDate = dates[0];
      const endDate = dates[1];

      const startDateDay = new Date(startDate.toDateString()).getDate();
      const endDateDay = new Date(endDate.toDateString()).getDate();

      startDate.setDate(startDateDay);
      endDate.setDate(endDateDay + 1);

      const filteredData = copyData.filter(element => {
        const userCreatedAt = new Date(element.createdat);
        return userCreatedAt > startDate && userCreatedAt < endDate;
      });

      endDate.setDate(endDateDay);
      setNewUsers(filteredData);

      filterTotalOrders(dates);
    };

  };

  const fetchOrders = async () => {
    const url = baseUrl + "orders/all";

    try {
      const { data } = await axios.get(url, header);
      // console.log(data);
      setTotalOrders(data);
      setTotalOrdersCopy(data);

    } catch (ex) {
      console.log(ex);

    };
  };

  const fetchTickets = async () => {
    const url = baseUrl + "tickets";

    try {
      const { data } = await axios.get(url, header);

      const onGoingTicket = data?.filter((element) => {
        return element.status == "on-going";
      });

      setTotalOngoingTickets(onGoingTicket);
      setIsLoading(false);

    } catch (ex) {
      setIsLoading(false);
      console.log(ex);

    };

  };

  useEffect(() => {
    setIsLoading(true);
    fetchUsers();
  }, []);


  if (isLoading) return (
    <div style={{ width: "100%", height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Spinner
        as="span"
        animation="border"
        role="status"
        aria-hidden={true}
        style={{ width: '30px', height: '30px', fontSize: '16px', paddingTop: '10px', color: "blue" }}
      />
    </div>
  );

  return (
    <CRow className='mz-dashboard'>
      <CCol xs={12} lg={12}>
        <CRow className="align-self-center justify-content-between">
          <CCol xs={6}>
            <h2 className='mt-2 mb-5'>Statistics</h2>
          </CCol>
          <CCol xs={12} sm={3} className="text-right">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              placeholderText='Filter By Date Range'
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
                filterNewUsers(update);
              }}
              withPortal
            />
          </CCol>
        </CRow>
      </CCol>


      <CCol sm={6} lg={4}>
        <CWidgetStatsA
          className="mb-4 mz-widget"
          color="primary"
          value={
            <>
              {newUsers.length}

            </>
          }
          title="New Users"
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                // labels: dates,
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: [78, 81, 80, 45, 34, 12, 40],
                    // data: newUsersPerDayCount,
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>


      <CCol sm={6} lg={4}>
        <CWidgetStatsA
          className="mb-4 mz-widget"
          color="info"
          value={
            <>
              {users.length}

            </>
          }
          title="Total Users"
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: [1, 18, 9, 17, 34, 22, 11],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: -9,
                    max: 39,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>


      <CCol sm={6} lg={4}>
        <CWidgetStatsA
          className="mb-4 mz-widget"
          color="warning"
          value={
            <>
              {totalOrders.length}

            </>
          }
          title="Overall Orders"
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>


      <CCol sm={6} lg={4}>
        <CWidgetStatsA
          className="mb-4 mz-widget"
          color="danger"
          value={
            <>
              {totalOngoingTickets.length}
            </>
          }
          title="On-Going Tickets"
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                  'January',
                  'February',
                  'March',
                  'April',
                ],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>

      {/* <CCol sm={6} lg={4}>
        <CWidgetStatsA
          className="mb-4 mz-widget"
          color="dark"
          value={
            <>
              ${kFormatter(totalDepositsAffiliates)}
            </>
          }
          title="Total Deposits (Referal Links)"
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: '#dedfe3',
                    data: [65, 59, 84, 84, 51, 55, 40],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: 30,
                    max: 89,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol> */}

      <br />

      {/* <CCol xs={12}>
        <h2 className='mt-2 mb-5'>Heading</h2>
      </CCol> */}




      <CCol xs={12} lg={12}>
        <h2 className='mt-4 mb-5'>Total Balance</h2>
      </CCol>
      <CCol xs={12} lg={3}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          // icon={<CIcon icon={cilDollar} height={24} />}
          icon={<img className='key-icon' src='images/cardImages/pay_keys.png' />}
          title="TF2"
          value={kFormatter(allTransactions.tf2.balance)}
        />
      </CCol>
      <CCol xs={12} lg={3}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          // icon={<CIcon icon={cilDiamond} height={24} />}
          icon={<img className='key-icon' src='images/cardImages/pay_steam.png' />}
          title="Gems"
          value={kFormatter(allTransactions.gems.balance)}
        />
      </CCol>
      <CCol xs={12} lg={3}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          // icon={<CIcon icon={cilDollar} height={24} />}
          icon={<img className='key-icon' src='images/cardImages/pay_csgo.png' />}
          title="CSGO"
          value={kFormatter(allTransactions.csgo.balance)}
        />
      </CCol>
      <CCol xs={12} lg={3}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          icon={<img className='key-icon' src='images/cardImages/pay_card.png' />}
          // icon={<CIcon icon={cilDollar} height={24} />}
          title="Card"
          // value={allTransactions.card.balance}
          value={`$${kFormatter(allTransactions.card.balance)}`}
        />
      </CCol>
      <CCol xs={12} lg={3}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          icon={<img className='key-icon' src='images/cardImages/pay_btc.png' />}
          // icon={<CIcon icon={cilDollar} height={24} />}
          title="Crypto"
          value={kFormatter(allTransactions.crypto.balance)}
        />
      </CCol>
    </CRow>

  );
}

export default WidgetsDropdown
