import React from 'react'
import { Button, Form } from 'react-bootstrap'

const Register = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px', height: '100vh' }}>
      Register Page
      <Form style={{ margin: 'auto', width: '50%', marginTop: '40px' }}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign up
      </Button>
    </Form>
    </div>
  )
}

export default Register
