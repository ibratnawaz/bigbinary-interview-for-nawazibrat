import React, { useState, useEffect } from 'react'
import { Spinner, Table } from 'react-bootstrap'

import DateFilter from './DateFilter'
import Filter from './Filter'
import Paginate from './Paginate'
import fetchData from '../utils/FetchData'

const DataTable = ({ location, history }) => {
  const [launches, setLaunches] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage] = useState(12)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    setLoading(true)
    if (!launches) statusHandler()
    setLoading(false)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setLoading(true)
    statusHandler()
    setTimeout(() => {
      setLoading(false)
    }, 500)
    setCurrentPage(
      location.pathname.split('/')[1] ? location.pathname.split('/')[1] : 1
    )
    // eslint-disable-next-line
  }, [location])

  const statusHandler = async () => {
    setLaunches(await fetchData())
    const status = location.pathname.split('/')[2]
    setFilter(!status ? 'all' : status)
    if (status === 'success') {
      setLaunches((prevState) =>
        prevState.filter((ele) => ele.launch_success === true)
      )
    } else if (status === 'failed') {
      setLaunches((prevState) =>
        prevState.filter((ele) => ele.launch_success === false)
      )
    } else if (status === 'upcoming') {
      setLaunches((prevState) =>
        prevState.filter((ele) => ele.launch_success === null)
      )
    }
  }

  var indexOfLastData = currentPage * dataPerPage
  var indexOfFirstData = indexOfLastData - dataPerPage
  if (launches) {
    if (!currentPage.length) {
      indexOfFirstData = 0
      indexOfLastData = dataPerPage
    }
    var currentPosts = launches.slice(indexOfFirstData, indexOfLastData)
  }

  return (
    <>
      <div className='row mb-5'>
        <div className='col-md-6'>
          <DateFilter />
        </div>
        <div className='col-md-6'>
          <Filter
            statusHandler={statusHandler}
            setFilter={setFilter}
            filter={filter}
            history={history}
          />
        </div>
      </div>

      <div className='table-border'>
        <Table responsive borderless hover>
          <thead className='table-head'>
            <tr>
              <th>No:</th>
              <th>Launched (UTC)</th>
              <th>Location</th>
              <th>Mission</th>
              <th>Orbit</th>
              <th>Launch Status</th>
              <th>Rocket</th>
            </tr>
          </thead>
          <tbody>
            {launches == null || loading ? (
              <tr>
                <td colSpan={7} className='text-center'>
                  <Spinner animation='border' />
                </td>
              </tr>
            ) : (
              launches &&
              currentPosts.map((obj, idx) => (
                <tr key={idx}>
                  <td>
                    {idx + indexOfFirstData < 9
                      ? `0${idx + 1 + indexOfFirstData}`
                      : idx + 1 + indexOfFirstData}
                  </td>
                  <td>{obj.launch_date_utc.slice(0, 10)}</td>
                  <td>{obj.launch_site.site_name}</td>
                  <td>{obj.mission_name}</td>
                  <td>{obj.rocket.second_stage.payloads[0].orbit}</td>
                  <td className='text-center'>
                    <span
                      className={
                        obj.launch_success
                          ? 'alert-success alert-n'
                          : obj.launch_success == null
                          ? 'alert-warning alert-n'
                          : 'alert-danger alert-n'
                      }>
                      {obj.launch_success
                        ? 'Success'
                        : obj.launch_success == null
                        ? 'Upcoming'
                        : 'Failed'}
                    </span>
                  </td>
                  <td>{obj.rocket.rocket_name}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {launches && (
        <Paginate
          dataPerPage={dataPerPage}
          totalPosts={launches.length}
          history={history}
          filter={filter}
          currentPage={currentPage}
        />
      )}
    </>
  )
}

export default DataTable
