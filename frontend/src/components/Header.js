import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const Header = () => {
  return (
    <header>
         <Navbar expand="lg" bg='dark'  variant='dark' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
        <Navbar.Brand> proShop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <LinkContainer to='/cart'>
            <Nav.Link><i className='fas fa-shopping-cart'/> Cart</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
            <Nav.Link><i className='fas fa-user'/> Sign In</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header
