import React from 'react'
import { Dropdown } from 'react-bootstrap'

const Filter = ({ statusHandler }) => {
  return (
    <div className='float-right'>
      <Dropdown>
        <Dropdown.Toggle id='dropdown-basic' className='filter-menu'>
          <i className='fas fa-filter'></i> &nbsp;Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href='#1/all'>All Launches</Dropdown.Item>
          <Dropdown.Item href='#2/upcoming'>Upcoming Launches</Dropdown.Item>
          <Dropdown.Item href='#3/success'>Successful Launches</Dropdown.Item>
          <Dropdown.Item href='#4/failed'>Failed Launches</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default Filter
