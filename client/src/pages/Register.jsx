import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import { register } from '../JS/actions/authAction';

const Register = () => {

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  // const isLoad = useSelector(state => state.authReducer.isLoad);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(newUser));
  };


  return (
    <div style={{ textAlign: 'center', marginTop: '20px', height: '100vh' }}>
      Register Page
      <Form onSubmit={handleRegister} style={{ margin: 'auto', width: '50%', marginTop: '40px' }}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" name='name' value={newUser.name} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" name='email' value={newUser.email} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={newUser.password} onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign up
      </Button>
    </Form>
    </div>
  )
}

export default Register
