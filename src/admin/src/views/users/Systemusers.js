import React, { useEffect, useState } from 'react'
// import Table from '../table/Table'
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import { Link, useNavigate } from "react-router-dom";
import { format } from 'date-fns'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { CButton, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilOptions } from "@coreui/icons";
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import AppModal from '../../components/AppModal';
import './user.css'
// import baseUrl from '../../Constants';
import apiUrl from '../../../../routes/apiUrl';

const Users = () => {
    const [data, setData] = useState([]);
    const [copyData, setCopyData] = useState([]);
    const [loadingUser, setLoadingUser] = useState(false);
    const [visible, setVisible] = useState(false);
    const [deleteUserState, setDeleteUserState] = useState({});
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const navigate = useNavigate();

    const headers = {
        headers: {
            'x-admin-token': JSON.parse(localStorage.getItem('ADtoken'))
        }
    };

    const pageHeading = "System Users"

    const deleteUser = async () => {
        const url = `${apiUrl}system-users/${deleteUserState?._id}`;

        try {
            const result = await axios.delete(url, headers);
            console.log(result)
            fetchUsers();
            setVisible(false);
        } catch (ex) {
            setVisible(false);
            console.log(ex);
        };
    };

    const filterUsers = (dates) => {

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

            setData(filteredData);
        };
    };

    const columns = [
        // {
        //     name: 'ID',
        //     selector: row => row._id,
        //     sortable: true,
        // },
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Registration Date',
            selector: row => format(new Date(row.created), 'MM/dd/yyyy'),
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
                            <CDropdownItem onClick={() => navigate("/system-users/edit", { state: row })} >Edit Token</CDropdownItem>

                            <CDropdownItem onClick={() => {
                                setVisible(true);
                                setDeleteUserState(row);
                            }}>
                                {row?.deleted ? "Undo Delete" : "Delete"}
                            </CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>

                </div>
            ),
        },
    ];


    const fetchUsers = async () => {

        setLoadingUser(true)

        try {
            const response = await axios.get(`${apiUrl}system-users`, headers);
            setData(response.data.data);
            setCopyData(response.data.data);
            setLoadingUser(false);

        } catch (ex) {
            console.error(ex);
            setLoadingUser(false)
        }

    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        // <Table headings={userHeadings} data={userData} pageHeading={pageHeading} />
        <div className='datatable-mainWrapper card'>

            <div className='my_datepicker'>
                <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    placeholderText='Filter By Date Range'
                    endDate={endDate}
                    onChange={(update) => {
                        setDateRange(update);
                        filterUsers(update);
                    }}
                    withPortal
                // onSelect={dates => filterUsers(dates)}
                />
            </div>

            <button
                className="btn btn-primary"
                onClick={() => { navigate('/system-users/create') }}
                type='button'
                style={{ "width": "135px", "height": "42px", "margin-left": "auto", "margin-right": "28px" }}>
                Add User
            </button>


            <DataTableExtensions
                columns={columns}
                data={data}
                print={false}
                export={false}
                filterPlaceholder="Search Here"
            // style={{ backgroundColor: "#000" }}
            >
                {
                    !loadingUser ?
                        <DataTable
                            // columns={columns}
                            // data={data}
                            // onRowClicked={(row) => navigate("/users/view-user", { state: row })}
                            // defaultSortField="id"
                            // defaultSortAsc={false}
                            title={pageHeading}
                            pagination
                            highlightOnHover
                            style={{ backgroundColor: "#000" }}
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
                title="Delete User"
                body="You are about to delete this user. This action cannot be undone."
                onClose={() => setVisible(false)}
                visible={visible}
                handleBtnClick={deleteUser}
            />
        </div>
    )

}

export default Users