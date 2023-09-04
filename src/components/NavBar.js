import React, { useContext} from 'react'
import {Context} from '../index';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {NavLink} from 'react-router-dom';
import { HOME_ROUTE, LOGIN_ROUTE, PERSONAL_ROUTE } from '../utils/consts';
import {observer} from 'mobx-react-lite'

const NavBar = observer( () => {
  const {user} = useContext(Context);
  const logout = () => {
    user.setUser({})
    user.setIsAuth(false);
    user.setIsAdmin(false);
    localStorage.removeItem('token');
  }
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
        <NavLink style={{color: 'white', textDecoration: 'none' }} to={HOME_ROUTE}>Reviews</NavLink>
            {user.isAuth ? 
            <Nav className='ms-auto'>
                {user.isAdmin && 
                <Button 
                    variant={'outline-light'}
                    className='me-2'
                    >Admin Panel</Button>}
                <Button variant={'outline-light'}>
                    <NavLink style={{color: 'white', textDecoration: 'none' }} to={PERSONAL_ROUTE}>Personal Area</NavLink>
                </Button>
                <Button 
                    variant={'outline-light'} 
                    className='ms-2'
                    onClick={logout}
                >Logout</Button>
            </Nav>
            :
            <Nav className='ms-auto'>
                <Button variant={'outline-light'}>
                    <NavLink style={{color: 'white', textDecoration: 'none' }} to={LOGIN_ROUTE}>Login/Register</NavLink>
                </Button>
            </Nav>
            }
        </Container>
    </Navbar>
  )
})

export default NavBar