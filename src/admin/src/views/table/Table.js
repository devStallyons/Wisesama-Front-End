import React from "react";
import CIcon from "@coreui/icons-react";
import { cilPencil, cilTrash, cilUserFollow } from "@coreui/icons";

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
} from "@coreui/react";

import { DocsExample } from "src/components";
import { Link } from "react-router-dom";

const Table = ({ headings, data, pageHeading }) => {
  return (
    <>
      
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              {pageHeading === "Users" ? 
                <div className="d-flex justify-content-between align-items-center"><strong>{pageHeading}</strong><Link to='/users/add-user'><CButton color="primary" className='d-flex align-items-center'>Add Users</CButton></Link></div>
               : <strong>{pageHeading}</strong>}
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    {headings?.map((heading) => {
                      // console.log(heading)
                      return (
                        <CTableHeaderCell scope="col">
                          {heading.heading}
                        </CTableHeaderCell>
                        // <CTableHeaderCell scope="col">{typeof(heading.heading) === 'string' ? heading.heading : heading.heading()  }</CTableHeaderCell>
                      );
                    })}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((data) => {
                    const dataArray = Object.values(data);
                    return (
                      <CTableRow>
                        {dataArray.map(
                          (item) => {
                            return (
                              item !== 'func' ?
                                <CTableDataCell scope="row">{item}</CTableDataCell> :
                                <CTableDataCell className='d-flex gap-2'>
                                  <Link to='/users/edit-user'>
                                    <CButton color="primary" className='d-flex align-items-center'><CIcon icon={cilPencil} height={15} customClassName="nav-icon" /></CButton>
                                  </Link>
                                  <CButton color="primary" className='d-flex align-items-center'><CIcon icon={cilTrash} height={15} customClassName="nav-icon" /></CButton>
                                </CTableDataCell>
                            )
                          }
                        )}
                        {pageHeading === 'Orders' ? <CTableDataCell className=''>
                          <Link to='/orders/order-details'>
                            <CButton color="primary" className='d-flex align-items-center'>View</CButton>
                          </Link>
                        </CTableDataCell> : ''}

                      </CTableRow>
                    );
                  })}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Table;
