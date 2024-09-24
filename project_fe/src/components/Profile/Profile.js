import React, { useEffect, useState } from 'react'
import {Container, Row, Col, Card} from 'react-bootstrap'
import './Profile.css'
import ToolsCard from '../Tools/Tools'


function Profile() {
  const [tools, setTools] = useState([])

  useEffect(() => {
    const fetchTools = async () =>{
      try {
        const response = await fetch ("http://localhost:4000/api/tools");
        const json = await response.json()
        setTools(json);
      } catch(error){
        console.error('error fetching tools', error)
      }
    }
    fetchTools();
  }, []);



return (
  <>
    <Container >
      <Row >
        <Col md={4} className='ProfileContainer'>
          <Card className='ProfileCard'>
            <Card.Title>Username</Card.Title>
            <Card.Text>Address</Card.Text>
            <Card.Text>Zip</Card.Text>
            <Card.Text>Email</Card.Text>
            <Card.Text>Phone</Card.Text>
          </Card>
          <button className='AddButton'>Add item</button>
          <button className='DeleteButton'>Delete item</button>
        </Col>
        

        <Col md={7}  className='ToolsContainer'>
          <h1>Available Tools:</h1>
          <Row >
            <Col className='Available'>
            
              {tools.map((tool) => (
                <ToolsCard key={tool._id} name={tool.name} description={tool.description} details={tool.description} />
              ))}
              <Card className='ToolCard'>
              <Card.Body>
                  <Card.Title>name</Card.Title>
                  <Card.Text>description</Card.Text>
                  <Card.Text>details</Card.Text>
              </Card.Body>
            </Card>
            <Card className='ToolCard'>
              <Card.Body>
                  <Card.Title>name</Card.Title>
                  <Card.Text>description</Card.Text>
                  <Card.Text>details</Card.Text>
              </Card.Body>
            </Card>
            <Card className='ToolCard'>
              <Card.Body>
                  <Card.Title>name</Card.Title>
                  <Card.Text>description</Card.Text>
                  <Card.Text>details</Card.Text>
              </Card.Body>
            </Card>
            </Col>
          </Row>
          <h1>Borrowed Tools:</h1>
          <Row>
            <Col className='Borrowed'>
            <Card className='ToolCard'>
              <Card.Body>
                  <Card.Title>name</Card.Title>
                  <Card.Text>description</Card.Text>
                  <Card.Text>details</Card.Text>
              </Card.Body>
            </Card>
            <Card className='ToolCard'>
              <Card.Body>
                  <Card.Title>name</Card.Title>
                  <Card.Text>description</Card.Text>
                  <Card.Text>details</Card.Text>
              </Card.Body>
            </Card>
            <Card className='ToolCard'>
              <Card.Body>
                  <Card.Title>name</Card.Title>
                  <Card.Text>description</Card.Text>
                  <Card.Text>details</Card.Text>
              </Card.Body>
            </Card>
            
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </>
)};


export default Profile
