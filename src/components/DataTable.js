import React, { useState, useEffect } from 'react'
import { Spinner, Table } from 'react-bootstrap'

import DateFilter from './DateFilter'
import Filter from './Filter'
import fetchData from '../utils/FetchData'

const DataTable = ({ location }) => {
  const [launches, setLaunches] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchLaunches = async () => {
      setLoading(true)
      setLaunches(await fetchData())
      setLoading(false)
    }
    if (!launches) fetchLaunches()
  }, [launches])

  useEffect(() => {
    setLoading(true)
    statusHandler()
    setTimeout(() => {
      setLoading(false)
    }, 500)
    // eslint-disable-next-line
  }, [location])

  const statusHandler = async () => {
    setLaunches(await fetchData())
    const status = location.hash.split('/').pop()
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

  return (
    <>
      <div className='row mb-5'>
        <div className='col-md-6'>
          <DateFilter />
        </div>
        <div className='col-md-6'>
          <Filter statusHandler={statusHandler} />
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
              launches.map((obj, idx) => (
                <tr key={idx}>
                  <td>{idx < 9 ? `0${idx + 1}` : idx + 1}</td>
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
    </>
  )
}

export default DataTable
