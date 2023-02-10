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

const NewSystemUser = () => {

    const headers = {
        headers: {
            'x-admin-token': JSON.parse(localStorage.getItem('ADtoken'))
        }
    };


    // const { state } = useLocation();
    const navigate = useNavigate();

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitForm = async (e) => {

        e.preventDefault();

        const payload = { username: userName, email: email, password: password }

        const url = `${apiUrl}system-users`

        const response = await axios.post(url, payload, headers);

        if (response.data.type === 'success') {
            navigate("/system-users")
        }
    }

    return (

        <div className='card'>
            <div className='card-header'>
                <div className='card-title'><strong>New System User</strong></div>
            </div>

            <div className='card-body mz-details'>

                <form onSubmit={submitForm}>
                    < CCol md={12} style={{ padding: "10px 10px 10px 10px" }}>
                        <CFormLabel htmlFor="inputEmail">Username</CFormLabel>
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
                                onChange={(e) => setUserName(e.target.value)}
                                value={userName}
                            />
                        </div>
                    </CCol>

                    < CCol md={12} style={{ padding: "10px 10px 10px 10px" }}>
                        <CFormLabel htmlFor="inputEmail">Email</CFormLabel>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <CFormInput
                                required
                                style={{ width: "100%", borderRadius: "10px 10px 10px 10px" }}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                    </CCol>
                    < CCol md={12} style={{ padding: "10px 10px 10px 10px" }}>
                        <CFormLabel htmlFor="inputEmail">Password</CFormLabel>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <CFormInput
                                required
                                style={{ width: "100%", borderRadius: "10px 10px 10px 10px" }}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                    </CCol>

                    <CCol xs={12} style={{ padding: "10px 10px 10px 10px", display: "flex", justifyContent: "flex-end" }}>
                        <CButton type='submit'>Save</CButton>
                    </CCol>
                </form>
            </div>
        </div>
    )
}

export default NewSystemUser