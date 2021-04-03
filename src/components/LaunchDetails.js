import React from 'react'
import moment from 'moment'
import { Col, Modal, Row } from 'react-bootstrap'

const LaunchDetails = ({ info, show, setShow }) => {
  const handleClose = () => setShow(false)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Row className='mr-2 ml-2'>
          <Col md={4}>
            <img
              className='rocket-img'
              src={
                info.links.mission_patch_small == null
                  ? '/favicon.ico'
                  : info.links.mission_patch_small
              }
              alt='rocket'
              width='64px'
            />
          </Col>
          <Col md={8}>
            <div className='mission-name'>
              <span className='mr-3'>{info.mission_name}</span>
              <small
                className={
                  info.launch_success
                    ? 'alert-success alert-n'
                    : info.launch_success == null
                    ? 'alert-warning alert-n'
                    : 'alert-danger alert-n'
                }>
                {info.launch_success
                  ? 'Success'
                  : info.launch_success == null
                  ? 'Upcoming'
                  : 'Failed'}
              </small>
            </div>
            <small>{info.rocket.rocket_name}</small>
            <br />
            <small className='links'>
              <a
                href={info.links.article_link}
                target='_blank'
                rel='noreferrer'>
                <i className='fas fa-globe'></i>
              </a>
              <a
                href={info.links.article_link}
                target='_blank'
                rel='noreferrer'>
                <i className='fab fa-wikipedia-w'></i>
              </a>
              <a href={info.links.video_link} target='_blank' rel='noreferrer'>
                <i className='fab fa-youtube'></i>
              </a>
            </small>
          </Col>
        </Row>
      </Modal.Header>
      <Modal.Body>
        <Row className='mr-2 ml-2'>
          <Col md={12} className='mb-4'>
            {info.details}{' '}
            <a href={info.links.wikipedia} target='_blank' rel='noreferrer'>
              Wikipedia
            </a>
          </Col>
          <Col md={6} className='mb-2 pb-2 border-bottom'>
            Flight Number
          </Col>
          <Col md={6} className='mb-2 pb-2 border-bottom'>
            {info.flight_number}
          </Col>

          <Col md={6} className='mb-2 pb-2 border-bottom'>
            Mission Name
          </Col>
          <Col md={6} className='mb-2 pb-2 border-bottom'>
            {info.mission_name}
          </Col>

          <Col md={6} className='mb-2 pb-2 border-bottom'>
            Rocket Type
          </Col>
          <Col md={6} className='mb-2 pb-2 border-bottom'>
            {info.rocket.rocket_type}
          </Col>

          <Col md={6} className='mb-2 pb-2 border-bottom'>
            Rocket Name
          </Col>
          <Col md={6} className='mb-2 pb-2 border-bottom'>
            {info.rocket.rocket_name}
          </Col>

          <Col md={6} className='mb-2 pb-2 border-bottom'>
            Manufacturer
          </Col>
          <Col md={6} className='mb-2 pb-2 border-bottom'>
            {info.rocket.second_stage.payloads[0].manufacturer}
          </Col>

          <Col md={6} className='mb-2 pb-2 border-bottom'>
            Nationality
          </Col>
          <Col md={6} className='mb-2 pb-2 border-bottom'>
            {info.rocket.second_stage.payloads[0].nationality}
          </Col>

          <Col md={6} className='mb-2 pb-2 border-bottom'>
            Launch Date
          </Col>
          <Col md={6} className='mb-2 pb-2 border-bottom'>
            {moment(info.launch_date_utc).format('D MMMM YYYY [at] h:mm')}
          </Col>

          <Col md={6} className='mb-2 pb-2 border-bottom'>
            Payload Type
          </Col>
          <Col md={6} className='mb-2 pb-2 border-bottom'>
            {info.rocket.second_stage.payloads[0].payload_type}
          </Col>

          <Col md={6} className='mb-2 pb-2 border-bottom'>
            Orbit
          </Col>
          <Col md={6} className='mb-2 pb-2 border-bottom'>
            {info.rocket.second_stage.payloads[0].orbit}
          </Col>

          <Col md={6} className='mb-2 pb-2 border-bottom'>
            Launch Site
          </Col>
          <Col md={6} className='mb-2 pb-2 border-bottom'>
            {info.launch_site.site_name}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default LaunchDetails
