import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPencil,
  cilTrash
} from '@coreui/icons';

import { useNavigate } from "react-router-dom";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CButton,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

// import { DocsExample } from 'src/components'
import { Link, Navigate } from 'react-router-dom';

const Tables = ({ data, pageHeading }) => {
  let navigate = useNavigate();

  const changeRoute = () => {
    navigate("/support/support-details");
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Support</strong>
          </CCardHeader>
          <CCardBody>
            <CTable className={`${pageHeading === 'Support' ? 'support_table' : ''}`}>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Ticket #</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Topic</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Steam ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Last Updated</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col"></CTableHeaderCell> */}

                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data?.map((data) => {
                  const { ticketNum, topic, status, date, steamID } = data;
                  // console.log(topic);
                  // console.log(topicStarted);
                  // console.log(users);
                  // console.log(comments);
                  // console.log(date);
                  return (
                    <CTableRow onClick={changeRoute}>
                      {/* <Link to='/support/support-details'> */}
                        <CTableDataCell scope="row">{ticketNum}</CTableDataCell>
                        <CTableDataCell scope="row">{topic}</CTableDataCell>
                        <CTableDataCell scope="row">{steamID}</CTableDataCell>
                        <CTableDataCell>{status}</CTableDataCell>
                        <CTableDataCell className=''>{date}</CTableDataCell>
                      {/* </Link> */}
                    </CTableRow>
                  )
                }
                )}
                {/* <CTableRow>
                  <CTableHeaderCell scope="row">2</CTableHeaderCell>
                  <CTableDataCell>Jacob</CTableDataCell>
                  <CTableDataCell>Thornton</CTableDataCell>
                  <CTableDataCell className='d-flex gap-2'>
                    <Link to='/users/edit-user'>
                      <CButton color="primary" className='d-flex align-items-center'><CIcon icon={cilPencil} height={15} customClassName="nav-icon" /></CButton>
                    </Link>
                    <CButton color="primary" className='d-flex align-items-center'><CIcon icon={cilTrash} height={15} customClassName="nav-icon" /></CButton>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">3</CTableHeaderCell>
                  <CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>
                  <CTableDataCell className='d-flex gap-2'>
                    <Link to='/users/edit-user'>
                      <CButton color="primary" className='d-flex align-items-center'><CIcon icon={cilPencil} height={15} customClassName="nav-icon" /></CButton>
                    </Link>
                    <CButton color="primary" className='d-flex align-items-center'><CIcon icon={cilTrash} height={15} customClassName="nav-icon" /></CButton>
                  </CTableDataCell>
                </CTableRow> */}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables
