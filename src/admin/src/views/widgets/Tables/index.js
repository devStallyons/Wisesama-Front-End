import React from 'react'
import './tables.css'

export default function Tables({ data, sorting, onSort }) {
  const [sortIconRotation, setSortIconRotation] = React.useState(false);
  return (
    <div className='dashboardMainPageTable'>
      <table>
        <thead>
          <tr>
            <th>User Name </th>
            <th>Total Deposit </th>
            <th>Method</th>
          </tr>
        </thead>
        <tbody>
          {
            data.length ? data.map((element, index) => (
              <React.Fragment key={index}>
                {
                  element.deposit.card !== 0 ?
                    <tr>
                      <td>{element.username}</td>
                      <td>${element.deposit.card}</td>
                      <td>Card</td>
                    </tr> : null
                }
                {
                  element.deposit.crypto !== 0 ?
                    <tr>
                      <td>{element.username}</td>
                      <td>${element.deposit.crypto}</td>
                      <td>Crypto</td>
                    </tr> : null
                }
              </React.Fragment>
            )) :
              <div style={{ display: "flex", justifyContent: 'center', alignItems: "center", height: "120px" }}>
                <p style={{ fontSize: "15px"}}>No data available</p>
              </div>
          }
        </tbody>
      </table>
      {
        sorting && data.length  ?
          <div
            onClick={() => (onSort(), setSortIconRotation(!sortIconRotation))}
            style={{ transform: !sortIconRotation ? 'rotate(0deg)' : 'rotate(180deg)' }}
            className='dashboardMainPageTableArrow'
          >
            <img style={{ width: "20px", height: "20px" }} src='images/sort-descending.png' />
          </div> :
          null
      }
    </div>
  )
}
