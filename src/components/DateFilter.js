import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { DateRangePicker } from 'react-date-range'
import moment from 'moment'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DateFilter = ({ history, filter, currentPage, dateRange }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [date, setDate] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ])

  const changeHandler = (item) => {
    setDate(() => {
      history.push(
        '/' +
          currentPage +
          '/' +
          filter +
          '/' +
          moment.utc(item.selection.startDate).format() +
          '/' +
          moment.utc(item.selection.endDate).format()
      )
      return [item.selection]
    })
  }
  if (dateRange) {
    var dateString = `${moment(dateRange[0]).format('D MMMM YYYY')} - ${moment(
      dateRange[1]
    ).format('D MMMM YYYY')}`
  }

  return (
    <>
      <div className='text-secondary' onClick={handleShow}>
        <i className='far fa-calendar-minus mr-2'></i>{' '}
        <span className='h6'>{dateString ? dateString : 'Select Date'}</span>
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
              onChange={(item) => changeHandler(item)}
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
