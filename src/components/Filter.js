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
          <Dropdown.Item href='#1/all' onClick={() => statusHandler('all')}>
            All Launches
          </Dropdown.Item>
          <Dropdown.Item
            href='#2/upcoming'
            onClick={() => statusHandler('upcoming')}>
            Upcoming Launches
          </Dropdown.Item>
          <Dropdown.Item
            href='#3/success'
            onClick={() => statusHandler('success')}>
            Successful Launches
          </Dropdown.Item>
          <Dropdown.Item
            href='#4/failed'
            onClick={() => statusHandler('failed')}>
            Failed Launches
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default Filter
