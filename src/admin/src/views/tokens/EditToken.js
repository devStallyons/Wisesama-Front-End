import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CButton,
    CCol,
    CFormInput,
    CFormLabel,
    CRow,
} from '@coreui/react'
import axios from 'axios';
import apiUrl from '../../../../routes/apiUrl';
import { useLocation } from 'react-router-dom'

const EditToken = () => {

    const headers = {
        headers: {
            'x-admin-token': JSON.parse(localStorage.getItem('ADtoken'))
        }
    };


    const { state } = useLocation();
    const navigate = useNavigate();

    const [c_token_name, setTokenName] = useState(state.crypto_token_name)
    const [c_token, setToken] = useState(state.crypto_token)

    const submitForm = async (e) => {

        e.preventDefault();

        const payload = { crypto_token_name: c_token_name, crypto_token: c_token }

        const url = `${apiUrl}crypto_tokens/${state._id}`

        const response = await axios.put(url, payload, headers);

        if (response.data.type === 'success') {
            navigate("/crypto-tokens")
        }
    }

    return (

        <div className='card'>
            <div className='card-header'>
                <div className='card-title'><strong>Edit Token</strong></div>
            </div>

            <div className='card-body mz-details'>

                <form onSubmit={submitForm}>
                    < CCol md={12} style={{ padding: "10px 10px 10px 10px" }}>
                        <CFormLabel htmlFor="inputEmail">Crypto Token Name</CFormLabel>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <CFormInput
                                required
                                style={{ width: "100%", borderRadius: "10px 10px 10px 10px" }}
                                type="text"
                                onChange={(e) => setTokenName(e.target.value)}
                                value={c_token_name}
                            />
                        </div>
                    </CCol>

                    < CCol md={12} style={{ padding: "10px 10px 10px 10px" }}>
                        <CFormLabel htmlFor="inputEmail">Crypto Token</CFormLabel>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <CFormInput
                                required
                                style={{ width: "100%", borderRadius: "10px 10px 10px 10px" }}
                                type="text"
                                onChange={(e) => setToken(e.target.value)}
                                value={c_token}
                            />
                        </div>
                    </CCol>

                    {/* <CCol md={11}>
                        <CRow className="justify-content-end align-items-end p-85">
                            <CCol xs="auto">
                                <CButton type='submit'>Update</CButton>
                            </CCol>
                        </CRow>
                    </CCol> */}

                    <CCol xs={12} style={{ padding: "10px 10px 10px 10px", display: "flex", justifyContent: "flex-end" }}>
                        <CButton type='submit'>Update</CButton>
                    </CCol>
                </form>
            </div>
        </div>
    )
}

export default EditToken