import React from 'react'
import { Pagination } from 'react-bootstrap'

/* eslint-disable */
const Paginate = ({
  dataPerPage,
  totalPosts,
  history,
  filter,
  currentPage,
  dateRange,
}) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / dataPerPage); i++) {
    pageNumbers.push(i)
  }

  const clickHandler = (num) => {
    if (dateRange) {
      history.push(
        '/' + num + '/' + filter + '/' + dateRange[0] + '/' + dateRange[1]
      )
    } else history.push('/' + num + '/' + filter)
  }

  const prevNextHandler = (type) => {
    if (type == 'prev') {
      const prev = parseInt(currentPage) > 0 ? parseInt(currentPage) - 1 : 1
      history.push('/' + prev + '/' + filter)
    } else if (type == 'next') {
      const next = parseInt(currentPage) > 0 ? parseInt(currentPage) + 1 : 1
      history.push('/' + next + '/' + filter)
    }
  }

  return (
    <Pagination className='float-right mt-4'>
      <Pagination.Prev
        onClick={() => prevNextHandler('prev')}
        disabled={currentPage == 1}
      />
      {pageNumbers.map((number) => (
        <Pagination.Item
          active={number == currentPage}
          key={number}
          onClick={() => clickHandler(number)}>
          {number}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => prevNextHandler('next')}
        disabled={Math.ceil(totalPosts / dataPerPage) == currentPage}
      />
    </Pagination>
  )
}

export default Paginate
