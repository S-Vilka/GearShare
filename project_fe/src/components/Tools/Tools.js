import React from 'react'
import { Button, Card} from 'react-bootstrap'

function ToolsCard({name, description, details}) {
  return (
    <Card>
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>{details}</Card.Text>
            <Button>X</Button>
        </Card.Body>
    </Card>
  )
}

export default ToolsCard