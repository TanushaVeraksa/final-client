import React, { useContext, useState} from 'react'
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
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useTheme} from '../hook/theme'

const locales = {
  en: { title: 'EN' },
  ru: { title: 'RU' },
};

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#003892',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const NavBar = observer(() => {
  const {theme, setTheme} = useTheme();
  const [checked, setChecked] = useState(theme === 'dark' ? true : false);
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
  const handleChange = (event) => {
    setChecked(event.target.checked)
    if(event.target.checked) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  };

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
        
         <FormControlLabel 
          checked={checked}
          onChange={handleChange}
          control={<MaterialUISwitch sx={{ mx: 2 }} defaultChecked />}/>
        </Container>
        </MediaQuery>
        <MediaQuery maxWidth={639}>
          <Container>
          <NavLink style={{color: 'white', textDecoration: 'none' }} to={HOME_ROUTE}>{t("nav.review")}</NavLink>
          <Nav className='m-auto'>
            <NavDropdown 
              title={t("nav.menu")} 
              id="basic-nav-dropdown">
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
                <FormControlLabel 
                    checked={checked}
                    onChange={handleChange}
                control={<MaterialUISwitch sx={{ mx: 5 }} defaultChecked />}/>
              </NavDropdown>
            </Nav>
          </Container>
        </MediaQuery>
    </Navbar>
  )
})

export default NavBar