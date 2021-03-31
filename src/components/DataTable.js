import React from 'react'
import { Spinner, Table } from 'react-bootstrap'

const DataTable = ({ launches, loading }) => {
  return (
    <>
      <div className='row mb-5'>
        <div className='col-md-6'>Past 6 Months</div>
        <div className='col-md-6'>
          <div className='float-right'>All Launches</div>
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
            {launches == null && loading ? (
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
