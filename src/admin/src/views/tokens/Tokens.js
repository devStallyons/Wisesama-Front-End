import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './order.css'
import { cilOptions } from "@coreui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import apiUrl from '../../../../routes/apiUrl';
import { CButton, CCol, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from "@coreui/react";
import AppModal from '../../components/AppModal';
import CIcon from "@coreui/icons-react";

const Tokens = () => {
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


  // console.log(state);

  // const pageHeading = "Orders";

  const columns = [
    // {
    //   name: 'Token Id',
    //   selector: row => row._id,
    //   sortable: true,
    // },
    {
      name: 'Token Name',
      selector: row => row.crypto_token_name,
      sortable: true,
    },
    {
      name: 'Token',
      selector: row => row.crypto_token,
      sortable: true,
    },
    {
      name: 'Date & Time',
      selector: row => format(new Date(row.created), "MM/dd/yyyy hh:mm a"),
      sortable: true,
    },
    {
      name: 'Actions',
      button: true,
      cell: (row) => (
        <div>

          <CDropdown className='mz-dropdown'>
            <CDropdownToggle><CIcon icon={cilOptions} height={15} customClassName="nav-icon" /></CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={() => navigate("/crypto-token/edit", { state: row })} >Edit Token</CDropdownItem>

              <CDropdownItem onClick={() => {
                setVisible(true);
                setdeleteTokenState(row);
              }}>
                {row?.deleted ? "Undo Delete" : "Delete"}
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

        </div>
      ),
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
    const url = apiUrl + "crypto_tokens";

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
    navigate("/crypto-token/view", { state: object });
  };

  const fetchReports = async () => {
    const url = apiUrl + "crypto_tokens";

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

  const addToken = () => { navigate("/crypto-token/create"); }


  const deleteToken = async () => {

    const url = `${apiUrl}crypto_tokens/${deleteTokenState?._id}`;

    try {
      const result = await axios.delete(url, headers);
      console.log(result);

      fetchReports();
      setVisible(false);
    } catch (ex) {
      setVisible(false);
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
        onClick={addToken}
        type='button'
        style={{ "width": "135px", "height": "42px", "margin-left": "auto", "margin-right": "28px" }}>
        Add Token
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
              title="Crypto Tokens"
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

      <AppModal
        title="Delete Token"
        body="You are about to delete this Token. This action cannot be undone."
        onClose={() => setVisible(false)}
        visible={visible}
        handleBtnClick={deleteToken}
      />
    </div >
  )
}

export default Tokens

