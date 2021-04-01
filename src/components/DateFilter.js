import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const DateFilter = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <div className='text-secondary' onClick={handleShow}>
        <i className='far fa-calendar-minus mr-2'></i>{' '}
        <span className='h6'>Select Date</span>
        <i className='fas fa-angle-down ml-3'></i>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DateFilter
