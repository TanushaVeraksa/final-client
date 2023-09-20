import React, {useContext, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink, useLocation, useNavigate} from 'react-router-dom';
import { REGISTRATION_ROUTE, LOGIN_ROUTE, HOME_ROUTE } from '../utils/consts';
import { registration, login } from '../http/userAPI';
import { getGoogleUser, getGithubUser} from '../http/authAPI';
import {observer} from 'mobx-react-lite'
import { Context } from '..';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTranslation } from 'react-i18next';

const Authorization = observer(() => {
  const { t, i18n } = useTranslation();
  const {user} = useContext(Context);
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const navigation = useNavigate();

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
      navigation(HOME_ROUTE)
    } catch(e) {
      alert(e.response.data.message)
    }
  }

const authorizationGithub = () => {
  getGithubUser().then(data => {
    user.setUser(data);
    user.setIsAuth(true);
})
  window.open('https://final-server-lyart.vercel.app/api/github');
}

const authorizationGoogle = () => {
    getGoogleUser().then(data => {
      user.setUser(data);
      user.setIsAuth(true);
  })
  
  window.open('https://final-server-lyart.vercel.app/api/google');
}

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{height: window.innerHeight - 54, width: '95%'}}
    >
      <Card className='p-3' style={{width: '80%'}}>
            <h3 className='m-auto'>{isLogin ? t("auth.auth") : t("registration.registration")}</h3>
            <Form className='d-flex flex-column'>
              <Row>
              <Col md={5} className='d-flex flex-column justify-content-around'>
                <Button 
                  style={{fontWeight: 'bold', fontSize: '1.2rem'}}
                  className='w-100' 
                  variant="dark"
                  onClick={authorizationGithub}
                  >
                    <GitHubIcon fontSize="large"/>GitHub
                </Button>
                <Button 
                  style={{fontWeight: 'bold', fontSize: '1.2rem'}}
                  className='w-100' 
                  variant="danger"
                  onClick={authorizationGoogle}
                  >
                    <GoogleIcon fontSize="large"/> Google
                </Button>
              </Col>
              <Col>
              <Form.Control
                className='mt-2'
                placeholder={t("auth.email")}
                value = {email}
                onChange={e => setEmail(e.target.value)}
              />
              {!isLogin && 
              <Form.Control 
                    className='mt-2'
                    placeholder={t("registration.name")}
                    value = {name}
                    onChange={e => setName(e.target.value)}
                />}
              <Form.Control 
                  className='mt-2'
                  placeholder={t("auth.password")}
                  type='password'
                  value = {password}
                  onChange={e => setPassword(e.target.value)}
              />
              <Row>
                {isLogin ? 
                <div className='mt-2'>
                  {t("auth.account")}<NavLink to={REGISTRATION_ROUTE}>{t("auth.register")}</NavLink>
                </div>
                :
                <div className='mt-2'>
                  {t("registration.account")}<NavLink to={LOGIN_ROUTE}>{t("registration.login")}</NavLink>
                </div>
                }
                <Button 
                className='mt-3 align-self-end w-50 m-auto' 
                variant="primary"
                onClick = {click}
                style={{fontWeight: 'bold', fontSize: '1.2rem'}}
                >
                 {isLogin ? t("registration.login") : t("registration.register")} 
                </Button>
              </Row>
              </Col>
              </Row>
            </Form>
      </Card>
    </Container>
  )
})

export default Authorization