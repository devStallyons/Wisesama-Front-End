import { format } from 'date-fns';
import React from 'react'
import { useLocation } from 'react-router-dom'


const TokenDetails = () => {
    const { state } = useLocation();

    return (
        <div className='card'>
            <div className='card-header'>
                <div className='card-title'><strong>Crypto Token Details</strong></div>
            </div>
            <div className='card-body mz-details'>
                <div className='row p-4'>
                    <div className='col-6 d-flex  justify-content-between px-4'>
                        <h6>Date: </h6>
                        <h6>{format(new Date(state.created), "MM/dd/yyy")}</h6>
                    </div>
                    <div className='col-6 d-flex  justify-content-between px-4'>
                        <h6>Token ID: </h6>
                        <h6>{state._id}</h6>
                    </div>
                </div>


                <div className='row p-4'>
                    <div className='col-12 d-flex  justify-content-between px-4'>
                        <h6>Crypto Token Name: </h6>
                        <h6>{state.crypto_token_name}</h6>
                    </div>


                </div>
                <div className='row p-4'>
                    <div className='col-12 d-flex  justify-content-between px-4'>
                        <h6>Crypto Token: </h6>
                        <h6>{state.crypto_token}</h6>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default TokenDetails