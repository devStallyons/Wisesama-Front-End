import { CCol, CRow } from '@coreui/react'
import React from 'react'
import { Dropdown, DropdownButton, Form } from 'react-bootstrap'
import Charts from '../widgets/Charts'
import Tables from '../widgets/Tables'

export default function ReferralCharts({
    showAddLinkForm,
    calculateTotalDepositsAffiliates,
    totalDepositsAffiliates,
    linkClicks,
    accountCreated,
    totalDepositsAffiliatesSeperated,
    setTotalDepositsAffiliatesSeperated,
    showdeposits
}) {
    const [sortYear, setSortYear] = React.useState(1);
    return (
        <>
            {
                !showAddLinkForm ?
                    <>
                        <div style={{ position: "relative", marginBottom: showdeposits === false ? "35px" : "0px" }}>
                            <CRow>
                                {!showdeposits ? <CCol xs={12} lg={6}>
                                    <h3 className='mt-2 mb-5'><span className='LinkCountsSpan'>{calculateTotalDepositsAffiliates(totalDepositsAffiliates)}</span> Deposits </h3>
                                    <Charts sortYear={sortYear} variant='line' widget="totalDeposits" label="Deposit" data={totalDepositsAffiliates} />
                                </CCol> : null}
                                <CCol xs={12} lg={6}>
                                    <h3 className='mt-2 mb-5'><span className='LinkCountsSpan'>{linkClicks.length}</span> Total Link Clicks</h3>
                                    <Charts sortYear={sortYear} variant='bar' widget="newUsersCart" label="Link clicks" data={linkClicks} />
                                </CCol>
                                <CCol xs={12} lg={6}>
                                    <h3 className='mt-2 mb-5'><span className='LinkCountsSpan'>{accountCreated.length}</span> New Accounts </h3>
                                    <Charts sortYear={sortYear} variant='bar' widget="newUsersCart" label="New users" data={accountCreated} />
                                </CCol>
                                {!showdeposits ? <CCol xs={12} lg={6}>
                                    <h3 style={{ marginTop: "33px" }} className='mb-5'>Deposits From New Accounts</h3>
                                    <Tables
                                        data={totalDepositsAffiliatesSeperated}
                                        sorting
                                        onSort={() => {
                                            setTotalDepositsAffiliatesSeperated(totalDepositsAffiliatesSeperated.reverse())
                                        }}
                                    />
                                </CCol> : null}
                            </CRow>

                            <div className='yearSortingDropdown' style={{ position: "absolute", top: "10px", right: "10px" }}>
                                <DropdownButton id="dropdown-item-button" title={sortYear === 0 ? "Last Year" : "Current Year"}>
                                    <Dropdown.Item as="button">
                                        <Form.Check
                                            type='checkbox'
                                            id={1}
                                            label='Current Year'
                                            onChange={() => setSortYear(1)}
                                            checked={sortYear === 1 ? true : false}
                                        />
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSortYear(0)} as="button">
                                        <Form.Check
                                            checked={sortYear === 0 ? true : false}
                                            type='checkbox'
                                            id={0}
                                            label='Last Year'
                                            onChange={() => setSortYear(0)}
                                        />
                                    </Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </div>
                        <br />
                        <br />
                    </> :
                    null
            }
        </>
    )
}
