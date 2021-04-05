import React, { useState, useEffect } from 'react'
import { Spinner, Table } from 'react-bootstrap'
import moment from 'moment'

import DateFilter from './DateFilter'
import Filter from './Filter'
import Paginate from './Paginate'
import LaunchDetails from './LaunchDetails'
import fetchData from '../utils/FetchData'

const DataTable = ({ location, history }) => {
  const [launches, setLaunches] = useState(null)
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [info, setInfo] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage] = useState(12)
  const [filter, setFilter] = useState('all')
  const [dateRange, setDateRange] = useState(null)

  useEffect(() => {
    setLoading(true)
    if (!launches) statusHandler()
    setLoading(false)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setLoading(true)
    if (location.pathname.split('/')[3]) {
      setDateRange([
        location.pathname.split('/')[3],
        location.pathname.split('/')[4],
      ])
    }
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

    if (location.pathname.split('/')[3]) {
      setLaunches((prevState) =>
        prevState.filter(
          (ele) =>
            ele.launch_date_utc >= location.pathname.split('/')[3] &&
            ele.launch_date_utc <= location.pathname.split('/')[4]
        )
      )
    }
  }

  const handleShow = (details) => {
    setShow(true)
    setInfo(details)
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
          <DateFilter
            history={history}
            filter={filter}
            currentPage={currentPage}
            dateRange={dateRange}
          />
        </div>
        <div className='col-md-6'>
          <Filter
            statusHandler={statusHandler}
            setFilter={setFilter}
            filter={filter}
            history={history}
            dateRange={dateRange}
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
                <tr key={idx} onClick={() => handleShow(obj)}>
                  <td>
                    {idx + indexOfFirstData < 9
                      ? `0${idx + 1 + indexOfFirstData}`
                      : idx + 1 + indexOfFirstData}
                  </td>
                  <td>
                    {moment(obj.launch_date_utc).format(
                      'D MMMM YYYY [at] h:mm'
                    )}
                  </td>
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
            {launches && !launches.length && !loading && (
              <tr>
                <td colSpan={7} className='text-center'>
                  No results found for the specific filter
                </td>
              </tr>
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
          dateRange={dateRange}
        />
      )}

      {info.rocket && (
        <LaunchDetails show={show} setShow={setShow} info={info} />
      )}
    </>
  )
}

export default DataTable
