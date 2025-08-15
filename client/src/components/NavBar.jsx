import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';


const NavBar = () => {
  return (
    <div>
      <Navbar expand="lg"  style={{ marginBottom: '20px', backgroundColor: 'white' }}>
      <Container>
        <Navbar.Brand href="/">Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default NavBar
