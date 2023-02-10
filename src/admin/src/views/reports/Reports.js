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
import apiUrl from '../../../../routes/apiUrl';

const Reports = () => {
  const [data, setData] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const { state } = useLocation();

  const headers = {
    headers: {
      'x-admin-token': JSON.parse(localStorage.getItem('ADtoken'))
    }
  };

  // console.log(state);

  // const pageHeading = "Orders";

  const columns = [
    // {
    //   name: 'Report Id',
    //   selector: row => row._id,
    //   sortable: true,
    // },
    {
      name: 'User',
      selector: row => row.user_id[0].name,
      sortable: true,
    },
    {
      name: 'Scam Type',
      selector: row => row.scam_type,
      sortable: true,
    },
    {
      name: 'Report Date & Time',
      selector: row => format(new Date(row.created), "MM/dd/yyyy hh:mm a"),
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
        return new Date(element.created) > dates[0] && new Date(element.created) < dates[1];
      });

      endDate.setDate(endDateDay);

      setData(filteredData);
    };
  };


  const fetchUserOrders = async (userid) => {
    const url = apiUrl + "reports";

    try {
      const { data } = await axios.get(`${url}`, headers);

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
    }
    navigate("/reports/report-details", { state: object });
  };

  const fetchReports = async () => {
    const url = apiUrl + "reports";

    try {
      const response = await axios.get(url, headers);
      setData(response.data.data);
      setCopyData(response.data.data);
      setIsLoading(false);

    } catch (ex) {
      setIsLoading(false);

    };
  };

  useEffect(() => {
    setIsLoading(true);
    if (state?._id) {
      fetchUserOrders(state?._id);
    } else {
      fetchReports();
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
              title="Reports"
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

export default Reports

