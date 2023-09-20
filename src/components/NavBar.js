import React, { useContext} from 'react'
import {Context} from '../index';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {NavLink, useNavigate} from 'react-router-dom';
import { HOME_ROUTE, LOGIN_ROUTE, PERSONAL_ROUTE, ADMIN_ROUTE } from '../utils/consts';
import {observer} from 'mobx-react-lite';
import {logoutGithub, logoutGoogle} from '../http/authAPI';
import { useTranslation } from 'react-i18next';
import MediaQuery from 'react-responsive';
import NavDropdown from 'react-bootstrap/NavDropdown';

const locales = {
  en: { title: 'EN' },
  ru: { title: 'RU' },
};

const NavBar = observer(() => {
  const navigation = useNavigate();
  const { t, i18n } = useTranslation();
  const {user} = useContext(Context);
  const logout = () => {
    user.setUser({})
    user.setIsAuth(false);
    user.setIsAdmin(false);
    localStorage.removeItem('token');
    logoutGithub().then(data => console.log(data));
    logoutGoogle().then(data => console.log(data));
    navigation(LOGIN_ROUTE);
  }
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <MediaQuery minWidth={640}>
        <Container>
        <NavLink style={{color: 'white', textDecoration: 'none' }} to={HOME_ROUTE}>{t("nav.review")}</NavLink>
            {user.isAuth ? 
            <Nav className='ms-auto'>
                {user.isAdmin && 
                <Button 
                    variant={'outline-light'}
                    className='me-2'
                    >
                    <NavLink style={{color: 'white', textDecoration: 'none' }} to={ADMIN_ROUTE}>{t("nav.admin")}</NavLink>
                    </Button>}
                <Button variant={'outline-light'}>
                    <NavLink style={{color: 'white', textDecoration: 'none' }} to={PERSONAL_ROUTE + '/' + user.user.id}>{t("nav.personal")}</NavLink>
                </Button>
                <Button 
                    variant={'outline-light'} 
                    className='ms-2'
                    onClick={logout}
                >{t("nav.logout")}</Button>
            </Nav>
            :
            <Nav className='ms-auto'>
                <Button variant={'outline-light'}>
                    <NavLink style={{color: 'white', textDecoration: 'none' }} to={LOGIN_ROUTE}>{t("nav.auth")}</NavLink>
                </Button>
            </Nav>
            }
        {Object.keys(locales).map((locale) => (
            <Button 
                className='ms-2'
                key={locale}
                variant={i18n.resolvedLanguage === locale ? 'light' : 'secondary' } 
                type="submit" 
                onClick={() => i18n.changeLanguage(locale)}>
                {locales[locale].title}
          </Button>
        ))}
        </Container>
        </MediaQuery>
        <MediaQuery maxWidth={639}>
          <Container>
          <NavLink style={{color: 'white', textDecoration: 'none' }} to={HOME_ROUTE}>{t("nav.review")}</NavLink>
          <Nav className='m-auto'>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              {user.isAuth ? 
              <>
                  {user.isAdmin && 
                  <NavDropdown.Item>
                      <NavLink style={{color: 'white', textDecoration: 'none' }} to={ADMIN_ROUTE}>{t("nav.admin")}</NavLink>
                  </NavDropdown.Item>}
                  <NavDropdown.Item>
                      <NavLink style={{color: 'white', textDecoration: 'none' }} to={PERSONAL_ROUTE + '/' + user.user.id}>{t("nav.personal")}</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                      className='ms-2'
                      onClick={logout}
                  >{t("nav.logout")}
                  </NavDropdown.Item>
              </>
              :
              <Nav className='ms-auto'>
                  <NavDropdown.Item>
                      <NavLink style={{color: 'white', textDecoration: 'none' }} to={LOGIN_ROUTE}>{t("nav.auth")}</NavLink>
                  </NavDropdown.Item>
              </Nav>
              }
              <NavDropdown.Item className='ms-auto'>
              {Object.keys(locales).map((locale) => (
              <Button 
                  className='ms-2'
                  key={locale}
                  variant={i18n.resolvedLanguage === locale ? 'light' : 'secondary' } 
                  type="submit" 
                  onClick={() => i18n.changeLanguage(locale)}>
                  {locales[locale].title}
              </Button>
              ))}
              </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </MediaQuery>
    </Navbar>
  )
})

export default NavBar