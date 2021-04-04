import React from 'react'
import { Form } from 'react-bootstrap'

const Filter = ({ filter, setFilter, history, dateRange }) => {
  const changeHandler = (e) => {
    e.preventDefault()
    setFilter(() => {
      if (dateRange) {
        history.push(
          '/1/' + e.target.value + '/' + dateRange[0] + '/' + dateRange[1]
        )
      } else history.push('/1/' + e.target.value)
      return e.target.value
    })
  }

  return (
    <div className='float-right filter-box'>
      <i className='fas fa-filter'></i>

      <Form.Control
        as='select'
        className='filter-menu'
        value={filter}
        onChange={changeHandler}>
        <option value='all'>All Launches</option>
        <option value='upcoming'>Upcoming Launches</option>
        <option value='success'>Successful Launches</option>
        <option value='failed'>Failed Launches</option>
      </Form.Control>
    </div>
  )
}

export default Filter
