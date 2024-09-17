import React from 'react'
import { Container,Row} from 'react-bootstrap'
import Toolsdata from './Toolsdata'
import './Tools.css'

function Tools() {
  return (
<div className='toolsContainer'>
    <Container className='toolContainer'>
        <Row>
            <Toolsdata/>
            <Toolsdata/>
            <Toolsdata/>
        </Row>
        <Row>
            <Toolsdata/>
            <Toolsdata/>
            <Toolsdata/>
        </Row>
        <Row>
            <Toolsdata/>
            <Toolsdata/>
            <Toolsdata/>
        </Row>

    </Container>
    </div>
  )
}

export default Tools