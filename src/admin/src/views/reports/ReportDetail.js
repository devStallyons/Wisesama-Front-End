import { format } from 'date-fns';
import React from 'react'
import { useLocation } from 'react-router-dom'


const ReportDetails = () => {
    const { state } = useLocation();

    return (
        <div className='card'>
            <div className='card-header'>
                <div className='card-title'><strong>Report Details</strong></div>
            </div>
            <div className='card-body mz-details'>
                <div className='row p-4'>
                    <div className='col-6 d-flex  justify-content-between px-4'>
                        <h6>Date: </h6>
                        <h6>{format(new Date(state.created), "MM/dd/yyy")}</h6>
                    </div>
                    <div className='col-6 d-flex  justify-content-between px-4'>
                        <h6>Report ID: </h6>
                        <h6>{state._id}</h6>
                    </div>
                </div>
                <div className='row p-4'>
                    <div className='col-6 d-flex  justify-content-between px-4'>
                        <h6>User Name: </h6>
                        <h6>{state.user_id[0].name}</h6>
                    </div>
                    <div className='col-6 d-flex  justify-content-between px-4'>
                        <h6>Scam Type: </h6>
                        <h6>{state.scam_type}</h6>
                    </div>
                </div>
                <div className='row p-4'>
                    <div className='col-6 d-flex  justify-content-between px-4'>
                        <h6>Reported Times: </h6>
                        <h6>{state.token[0].reported_times} Times</h6>
                    </div>
                    <div className='col-6 d-flex  justify-content-between px-4'>
                        <h6>Transactions: </h6>
                        <h6>{state.token[0].transaction_times} Transactions</h6>
                    </div>
                </div>
                <div className='row p-4'>
                    <div className='col-12 d-flex  justify-content-between px-4'>
                        <h6>Block Chain Payment Address: </h6>
                        <h6>{state.bcp_address}</h6>
                    </div>
                    {/* <div className='col-6 d-flex  justify-content-between px-4'>
                        <h6>Price: </h6>
                        <h6>${state.price}</h6>
                    </div> */}
                </div>
                <div className='row p-4'>
                    <div className='col-12 d-flex  justify-content-between px-4'>
                        <h6>Description: </h6>
                        <h6>{state.description}</h6>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default ReportDetails