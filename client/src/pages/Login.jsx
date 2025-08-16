import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../JS/actions/authAction';

const Login = () => {

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(user, navigate));
  };


  return (
    <div style={{ textAlign: 'center', marginTop: '20px', height: '100vh' }}>
      Login Page
      <Form onSubmit={handleLogin} style={{ margin: 'auto', width: '50%', marginTop: '40px' }}>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" name='email' value={user.email} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={user.password} onChange={handleChange} />
      </Form.Group>
      <Button variant="success" type="submit">
        Sign in
      </Button>
    </Form>
    </div>
  )
}

export default Login
