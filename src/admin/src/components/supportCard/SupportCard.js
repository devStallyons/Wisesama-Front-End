import { format } from 'date-fns'
import React from 'react'
import profile from '../../assets/images/avatars/1.jpg'
import styles from './supportCard.module.css'

const SupportCard = ({ avatar, date, name, role, email, comment }) => {
  return (
    <div className="card my-4 mz-SupportTicket">
      <div className="card-header d-flex justify-content-between">
        <div className="d-flex">
          <div>
            <img src={avatar} className={styles.avatar} alt='profile' width='150px' />
          </div>
          <div className='ticketUser_detail'>
            <h5>{name}<span className="badge text-bg-success mx-2">{role}</span></h5>
            <p>{email}</p>
          </div>
        </div>
        <div className='ticket-date'>
          <h6>{format(new Date(date), "MM/dd/yyyy p")}</h6>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text">{comment}</p>
      </div>
    </div>
  )
}

export default SupportCard