import "../../../scss/style.scss"
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { Spinner } from 'react-bootstrap'
import baseUrl from '../../../Constants'
import bcrypt from 'bcryptjs'
import apiUrl from "../../../../../routes/apiUrl"


const Login = () => {
  const [userName, setUserName] = useState([]);
  const [password, setPassword] = useState([]);
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const header = {
    headers: {
      'x-auth-token': JSON.parse(localStorage.getItem('ADtoken'))
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const url = apiUrl + "admin/login";

    const useData = {
      username: userName,
      password,
    };

    try {
      const { data } = await axios.post(url, useData, header);

      //encrypting token by hashing it
      // const salt = await bcrypt.genSalt(10);
      // const EToken = await bcrypt.hash(data.token, salt);

      localStorage.setItem('ADtoken', JSON.stringify(data.token));
      setIsLoading(false);

      navigate("/users");

    } catch (ex) {
      console.log(ex);
      setIsLoading(false);

      if (ex?.response?.data == "Invalid email or password.") {
        setIsInvalidCredentials(true);
      };
    };

  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput required onChange={(e) => setUserName(e.target.value)} placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    {
                      isInvalidCredentials &&
                      <CRow>
                        <h6 style={{ marginTop: "-20px", marginLeft: "5px", color: "red", paddingBottom: "10px" }}>Invalid email or password.</h6>
                      </CRow>
                    }
                    <CRow>
                      <CCol xs={6}>
                        <CButton type='submit' color="primary" className="px-4">
                          {
                            isLoading ?
                              <Spinner
                                as="span"
                                animation="border"
                                role="status"
                                aria-hidden={true}
                                style={{ width: '20px', height: '20px', fontSize: '10px', paddingTop: '10px', marginBottom: "-3px" }}
                              /> :
                              "Login"
                          }
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
