import React from 'react'
import { Pagination } from 'react-bootstrap'

const Paginate = () => {
  return (
    <Pagination className='float-right mt-4'>
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Item>{2}</Pagination.Item>
      <Pagination.Item>{3}</Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
    </Pagination>
  )
}

export default Paginate
