import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../JS/actions/authAction';


const NavBar = () => {

  const isAuth = useSelector(state => state.authReducer.isAuth);
  const dispatch = useDispatch();

  return (
    <div>
      <Navbar expand="lg"  style={{ marginBottom: '20px', backgroundColor: 'white' }}>
      <Container>
        <Navbar.Brand href="/">Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {isAuth ? (
              <>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="#" onClick={() => dispatch(logout())}>Logout</Nav.Link>
              </>
            ) : (
              <>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default NavBar
