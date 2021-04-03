import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DateFilter = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ])

  return (
    <>
      <div className='text-secondary' onClick={handleShow}>
        <i className='far fa-calendar-minus mr-2'></i>{' '}
        <span className='h6'>Select Date</span>
        <i className='fas fa-angle-down ml-3'></i>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        className='modal-size'
        aria-labelledby='contained-modal-title-vcenter'
        centered>
        <Modal.Header closeButton>
          <Modal.Body>
            <DateRangePicker
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
            />
          </Modal.Body>
        </Modal.Header>
      </Modal>
    </>
  )
}

export default DateFilter
