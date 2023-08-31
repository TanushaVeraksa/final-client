import React, {useContext, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/Row';
import { NavLink, useLocation, useNavigate} from 'react-router-dom';
import { REGISTRATION_ROUTE, LOGIN_ROUTE } from '../utils/consts';

function Authorization() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const location = useLocation();
  const navigation = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{height: window.innerHeight - 54, width: '95%'}}
    >
      <Card className='p-3' style={{width: '60%'}}>
            <h3 className='m-auto'>{isLogin ? 'Authorization' : 'Registration'}</h3>
            <Form className='d-flex flex-column'>
              <Form.Control
                className='mt-2'
                placeholder='Enter email'
                value = {email}
                onChange={e => setEmail(e.target.value)}
              />
              {!isLogin && 
              <Form.Control 
                    className='mt-2'
                    placeholder='Enter name'
                    value = {name}
                    onChange={e => setName(e.target.value)}
                />}
              <Form.Control 
                  className='mt-2'
                  placeholder='Enter password'
                  type='password'
                  value = {password}
                  onChange={e => setPassword(e.target.value)}
              />
              <Row>
                {isLogin ? 
                <div className='mt-2'>
                  No account? <NavLink to={REGISTRATION_ROUTE}>Register</NavLink>
                </div>
                :
                <div className='mt-2'>
                  Have an account? <NavLink to={LOGIN_ROUTE}>Login</NavLink>
                </div>
                }
                <Button 
                className='mt-3 align-self-end w-50 m-auto' 
                variant={'outline-success'}
                >
                  Login
                </Button>
              </Row>

            </Form>
      </Card>
    </Container>
  )
}

export default Authorization