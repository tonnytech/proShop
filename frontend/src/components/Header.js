import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { logoutUser } from '../redux/slices/user/loginUserSlice'

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.loginUserSlice)
  const { loginUserInfo, userProfile } = userLogin;
    const [user, setUser] = useState(loginUserInfo);

  const logoutHandler = () => {
    dispatch(logoutUser());
    setUser([])
  }

  useEffect(()=>{
    
    if(!userProfile._id){
      setUser(loginUserInfo)
    } else {
      setUser(userProfile)
    }
  },[loginUserInfo.length, dispatch, loginUserInfo, user, userProfile])

    return (
      <header>
        <Navbar expand="lg" bg='dark'  variant='dark' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand> proShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
            <LinkContainer to='/cart'>
              <Nav.Link><i className='fas fa-shopping-cart'/> Cart</Nav.Link>
              </LinkContainer>
              {loginUserInfo._id ? (
                  <NavDropdown title={user.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ):
              <LinkContainer to='/login'>
              <Nav.Link><i className='fas fa-user'/> Sign In</Nav.Link>
              </LinkContainer>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </header>
    )
}

export default Header
