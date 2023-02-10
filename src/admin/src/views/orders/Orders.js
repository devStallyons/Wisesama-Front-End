import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './order.css'

import { useLocation, useNavigate } from "react-router-dom";
import baseUrl from '../../Constants';

const Orders = () => {
  const [data, setData] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const { state } = useLocation();

  const header = {
    headers: {
      'x-auth-token': JSON.parse(localStorage.getItem('ADtoken'))
    }
  };



  const columns = [
    {
      name: 'Date',
      selector: row => format(new Date(row.datetimecreated), "MM/dd/yyyy"),
      sortable: true,
    },
    {
      name: 'Order ID',
      selector: row => row._id,
      sortable: true,
    },
    {
      name: 'Steam ID',
      selector: row => state ? state.steamid : row.user?.steamid ? row.user.steamid : row.steamid,
      sortable: true,
    },
    {
      name: 'Username',
      selector: row => state ? state.personaname : row.name,
      sortable: true,
    },
    {
      name: 'Desired Level',
      selector: row => row.desiredlevel,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
    },
    {
      name: 'Price',
      selector: row => row.price,
      sortable: true,
    },

  ];

  const filterOrders = (dates) => {

    if (dates[0] && dates[1]) {
      const startDate = dates[0];
      const endDate = dates[1];

      const startDateDay = new Date(startDate.toDateString()).getDate();
      const endDateDay = new Date(endDate.toDateString()).getDate();

      startDate.setDate(startDateDay);
      endDate.setDate(endDateDay + 1);

      const filteredData = copyData.filter(element => {
        return new Date(element.datetimecreated) > dates[0] && new Date(element.datetimecreated) < dates[1];
      });

      endDate.setDate(endDateDay);

      setData(filteredData);
    };
  };


  const fetchUserOrders = async (userid) => {
    const url = baseUrl + "orders";

    try {
      const { data } = await axios.get(`${url}/${userid}`, header);
      setData(data.reverse());
      setCopyData(data);
      setIsLoading(false);

    } catch (ex) {
      console.log(ex);
      setIsLoading(false);

    };

  };

  let navigate = useNavigate();

  const changeRoute = (row) => {
    const object = {
      ...row,
      username: state ? state.personaname : row.user?.personaname,
      steamid: state ? state.steamid : row.user?.steamid,
    }
    navigate("/orders/order-details", { state: object });
  };

  const fetchOrders = async () => {
    const url = baseUrl + "orders/all?userdata=true";

    try {
      const { data } = await axios.get(url, header);

      setData(data.reverse());
      setCopyData(data);
      setIsLoading(false);

    } catch (ex) {
      setIsLoading(false);
      console.log(ex);

    };
  };

  useEffect(() => {
    setIsLoading(true);
    if (state?._id) {
      fetchUserOrders(state?._id);
    } else {
      fetchOrders();
    };
  }, []);

  return (
    // <Table headings={orderHeadings} data={orderDetails} pageHeading={pageHeading} />
    <div className='datatable-mainWrapper card'>


      <div className='my_datepicker'>
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          placeholderText='Filter By Date Range'
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update);
            filterOrders(update);
          }}
          withPortal
        // onSelect={dates => filterUsers(dates)}
        />
      </div>


      <DataTableExtensions
        columns={columns}
        data={data}
        print={false}
        export={false}
        filterPlaceholder="Search Here"
      >

        {
          !isLoading ?
            <DataTable
              // columns={columns}
              // data={data}
              title="Orders"
              onRowClicked={changeRoute}
              // defaultSortField="id"
              // defaultSortAsc={false}
              pagination
              highlightOnHover
            /> :
            <div
              style={{
                width: '100%',
                height: '55vh',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner
                as="span"
                animation="border"
                role="status"
                aria-hidden={true}
                style={{ width: '25px', height: '25px', fontSize: '10px', paddingTop: '10px' }}
              />
            </div>
        }
      </DataTableExtensions>
    </div>
  )
}

export default Orders


// const data = [
//   {
//     date: '8/12/2022',
//     id: '53534267992825267',
//     steamid: '52523',
//     name: 'hamza',
//     type: '50',
//     status: 'Pending',
//     price: '+ $24.00(Crypto)',
//   },
//   {
//     date: '8/5/2022',
//     id: '45',
//     steamid: '9252',
//     name: 'Hamza',
//     type: 'Deposited - Card',
//     status: 'Confirmed',
//     price: '+ $81.51(Card)',
//   },
//   {
//     date: '8/2/2022',
//     id: '25639852548965896',
//     steamid: '82523',
//     name: 'khalid',
//     type: '64',
//     status: 'Pending',
//     price: '+ $162.00(Card)',
//   },
//   {
//     date: '8/1/2022',
//     id: '25639852548965722',
//     steamid: '2223',
//     name: 'usman',
//     type: '41',
//     status: 'Completed',
//     price: '+ $151.00(Card)',
//   }
// ];