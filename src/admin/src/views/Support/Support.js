import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import { useNavigate } from "react-router-dom";
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash } from '@coreui/icons';
import { CButton } from '@coreui/react';

import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { Spinner } from 'react-bootstrap';
import baseUrl from '../../Constants';

const Support = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { state } = useLocation();
    // console.log(state);

    const steamid = state?.steamid;

    const header = {
        headers: {
            'x-auth-token': JSON.parse(localStorage.getItem('ADtoken'))
        }
    };

    const columns = [
        {
            name: 'Ticket #',
            selector: row => `#${row.ticketCode}`,
            sortable: true,
        },
        {
            name: 'Topic',
            selector: row => row.subject,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Steam ID',
            selector: row => steamid ? steamid : row.steamid,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => format(new Date(row.date), "MM/dd/yyyy p"),
            sortable: true,
        },
    ];


    const pageHeading = "Support"

    // const changeRoute = () => {
    //   navigate("/support/support-details"); 
    // }

    let navigate = useNavigate();
    const changeRoute = (row, event) => { navigate("/support/support-details", { state: { ticket: row, allTickets: data } }); };

    // const onRowClicked = () => (result.map(result => (e => onMeetingTitleClick(e, result.id))));

    const fetchUserTickets = async () => {
        const url = baseUrl + "tickets/usertickets";

        try {
            const { data } = await axios.get(`${url}/${steamid}`, header);
            setData(data?.reverse());
            setIsLoading(false);

        } catch (ex) {
            console.log(ex);
            setIsLoading(false);

        };

    };

    const fetchAllTickets = async () => {
        const url = baseUrl + "tickets";

        try {
            const { data } = await axios.get(url, header);
            setData(data?.reverse());
            setIsLoading(false);

        } catch (ex) {
            setIsLoading(false);
            console.log(ex);

        };

    };

    const handleRespondToOldest = () => {
        const onGoingTickets = data.filter((element, index) => {
            return element.status !== "closed";
        });

        const arrayLength = onGoingTickets.length;
        const lastElementIndex = arrayLength - 1;

        let lastElement = { ...onGoingTickets[lastElementIndex] };

        if (!arrayLength) return;

        navigate("/support/support-details", {
            state: {
                ticket: lastElement,
                allTickets: data,
                onGoingTickets: onGoingTickets,
                from: "support"
            }
        });
    };

    useEffect(() => {
        setIsLoading(true);

        if (steamid) {
            fetchUserTickets();
        } else {
            fetchAllTickets();
        };
    }, []);

    return (
        // <Tables headings={supportHeadings} data={supportData} pageHeading={pageHeading} />
        <div className='datatable-mainWrapper card mz_supportListing'>

            <CButton onClick={handleRespondToOldest} component="button" color="primary" className="link_toRespond" role="button">Respond To Oldest</CButton>

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
                            title="Support Tickets"
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

export default Support


// const data = [
//     {
//         ticketNum: '#GWT-421-64346',
//         topic: 'Do not email us with your website login details',
//         status: 'Closed',
//         steamID: '66',
//         date: '8/12/2022 05:11PM',
//     },
//     {
//         ticketNum: '#GWT-421-64346',
//         topic: 'Do not email us with your website login details',
//         status: 'Closed',
//         steamID: '66',
//         date: '8/12/2022 05:11PM',
//     },
//     {
//         ticketNum: '#UZR-766-12345',
//         topic: 'Cannot select.pk as domain for new professional hosting package',
//         status: 'On-going',
//         steamID: '47',
//         date: '7/22/2022 12:35AM',
//     },
//     {
//         ticketNum: '#BSX-431-12647',
//         topic: 'Need dedicated IP for my VPS',
//         status: 'Closed',
//         steamID: '89',
//         date: '6/06/2022 02:31PM',
//     },
//     {
//         ticketNum: '#MNF-312-45312',
//         topic: 'Shared Linux Hosting Plan',
//         status: 'Closed',
//         steamID: '55',
//         date: '2/04/2022 01:51PM',
//     }
// ]