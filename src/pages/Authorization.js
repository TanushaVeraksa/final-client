import React, {useContext, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/Row';
import { NavLink, useLocation, useNavigate} from 'react-router-dom';
import { REGISTRATION_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { registration, login } from '../http/userAPI';
import { } from '../http/authAPI';
import {observer} from 'mobx-react-lite'
import { Context } from '..';


const Authorization = observer(() => {
  const {user} = useContext(Context);
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const click = async() => {
    try {
      let data;
      if(isLogin) {
        data = await login(email, password);
        if(data.role === 'Admin') {
          user.setIsAdmin(true);
        }
      } else {
        data = await registration(email, name, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
    } catch(e) {
      alert(e.response.data.message)
    }
  }

  const authorizationGithub = () => {
    localStorage.setItem('token', 'token')
    window.open('https://final-server-lyart.vercel.app/api/github');
  }

  const authorizationVK = () => {

  }

  const authorizationGoogle = () => {
   
  }

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
                onClick = {click}
                >
                 {isLogin ? 'Login' : 'Register'} 
                </Button>
              </Row>
              <Row>
              <Button 
                className='mt-3 align-self-end w-25 m-auto' 
                variant={'outline-success'}
                onClick={authorizationGithub}
                >
                  GitHub
                </Button>
                <Button 
                className='mt-3 align-self-end w-25 m-auto' 
                variant={'outline-success'}
                onClick={authorizationVK}
                >
                  VK
                </Button>
                <Button 
                className='mt-3 align-self-end w-25 m-auto' 
                variant={'outline-success'}
                onClick={authorizationGoogle}
                >
                  Google
                </Button>
              </Row>
            </Form>
      </Card>
    </Container>
  )
})

export default Authorization