import React from 'react'
import { Button, Form } from 'react-bootstrap'

const Login = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px', height: '100vh' }}>
      Login Page
      <Form style={{ margin: 'auto', width: '50%', marginTop: '40px' }}>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="success" type="submit">
        Sign in
      </Button>
    </Form>
    </div>
  )
}

export default Login
