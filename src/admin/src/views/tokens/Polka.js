import axios from 'axios';
// import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './order.css'
import apiUrl from '../../../../routes/apiUrl';
// import { cilOptions } from "@coreui/icons";
import { useLocation, useNavigate } from "react-router-dom";
// import { CButton, CCol, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from "@coreui/react";
// import AppModal from '../../components/AppModal';
// import CIcon from "@coreui/icons-react";
import Swal from 'sweetalert2'

const Polka = () => {
  const [data, setData] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const { state } = useLocation();

  const [visible, setVisible] = useState(false);
  const [deleteTokenState, setdeleteTokenState] = useState({});



  const headers = {
    headers: {
      'x-admin-token': JSON.parse(localStorage.getItem('ADtoken'))
    }
  };

  const columns = [


    {
      name: 'Token Type',
      selector: row => RegExp(/^\p{L}/, 'u').test(row.token.charAt(0)) ? 'Kusama' : 'Polka',
      sortable: true,
    },
    {
      name: 'Token',
      selector: row => row.token,
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


  const udpdatePolkaTokens = async () => {

    try {
      await axios.get(`${apiUrl}crypto_tokens/updatePolkaDotTokens`, headers);

      toastMixin.fire({
        animation: true,
        title: `Updated`,
        icon: 'success'
      });

    } catch (ex) {
      console.log(ex);
    };
  }

  const toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });


  const fetchUserOrders = async (userid) => {
    const url = apiUrl + "crypto_tokens/polka-tokens";

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


  const fetchReports = async () => {
    const url = apiUrl + "crypto_tokens/polka-tokens";

    try {
      const response = await axios.get(url, headers);
      setData(response.data.data);
      setCopyData(response.data.data);
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
      fetchReports();
    };
  }, []);

  return (

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

      <button
        className="btn btn-primary"
        onClick={udpdatePolkaTokens}
        type='button'
        style={{ "width": "200px", "height": "42px", "margin-left": "auto", "margin-right": "28px" }}>
        Update Polka Tokens
      </button>



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
              title="Polka Tokens"
              // onRowClicked={changeRoute}
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



    </div >
  )
}

export default Polka

