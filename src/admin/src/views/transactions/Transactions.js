import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./transaction.css"

import { useLocation, useNavigate } from "react-router-dom";
import baseUrl from '../../Constants';

const Transactions = () => {
  const [data, setData] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const pageHeading = "Transactions";

  const { state } = useLocation();
  const userid = state?._id;
  // console.log(state);

  const header = {
    headers: {
      'x-auth-token': JSON.parse(localStorage.getItem('ADtoken'))
    }
  };

  const columns = [
    {
      name: 'Date',
      selector: row => format(new Date(row.date), "MM/dd/yyyy"),
      sortable: true,
    },
    {
      name: 'Transaction ID',
      selector: row => row.transactionid,
      sortable: true,
    },
    {
      name: 'Payment Type',
      selector: row => row.type,
      sortable: true,
    },
    {
      name: 'Steam ID',
      selector: row => state ? state.steamid : (row.steamid ? row.steamid : row.user?.steamid),
      sortable: true,
    },
    {
      name: 'Username',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: row => `${row.type == "card" ? `$${row.price}` : row.price}`,
      sortable: true,
    },

  ];

  const filterTransactions = (dates) => {

    if (dates[0] && dates[1]) {
      const startDate = dates[0];
      const endDate = dates[1];

      const startDateDay = new Date(startDate.toDateString()).getDate();
      const endDateDay = new Date(endDate.toDateString()).getDate();

      startDate.setDate(startDateDay);
      endDate.setDate(endDateDay + 1);

      const filteredData = copyData.filter(element => {
        const TransactionCreatedAt = new Date(element.date);
        return TransactionCreatedAt > startDate && TransactionCreatedAt < endDate;
      });

      endDate.setDate(endDateDay);

      setData(filteredData);
    };
  };


  let navigate = useNavigate();
  const changeRoute = (row, event) => { navigate("/transactions/transaction-details", { state: row }); };

  const fetchUserTransactions = async () => {
    const url = baseUrl + "transactions";

    try {
      const { data } = await axios.get(`${url}/${userid}`, header);
      setData(data.reverse());
      setCopyData(data);
      setIsLoading(false);

    } catch (ex) {
      setIsLoading(false);
      console.log(ex);

    };

  };

  const fetchAllTransactions = async () => {
    const url = baseUrl + "transactions/all?userdata=true";

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

    if (userid) {
      fetchUserTransactions();
    } else {
      fetchAllTransactions();
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
            filterTransactions(update);
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
              title={pageHeading}
              // onRowClicked={changeRoute}
              // defaultSortField="id"
              // defaultSortAsc={false}
              onRowClicked={changeRoute}
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

export default Transactions



// const data = [
//   {
//     date: '8/12/2022',
//     id: '123',
//     steamid: '52523',
//     name: 'hamza',
//     payType: 'Credit Card',
//     price: '+ $24.00(Crypto)',
//   },
//   {
//     date: '8/5/2022',
//     id: '45',
//     steamid: '9252',
//     name: 'Hamza',
//     payType: 'Crypto',
//     price: '+ $81.51(Card)',
//   },
//   {
//     date: '8/2/2022',
//     id: '5435',
//     steamid: '82523',
//     name: 'khalid',
//     payType: 'Crypto',
//     price: '+ $162.00(Card)',
//   },
//   {
//     date: '8/1/2022',
//     id: '232',
//     steamid: '2223',
//     name: 'usman',
//     payType: 'Crypto',
//     price: '+ $151.00(Card)',
//   }
// ]