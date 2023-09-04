import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import {observer} from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Context } from '.';
import {check} from './http/userAPI';
import jwt_decode from 'jwt-decode';

const App = observer(() => {
  const {user} = useContext(Context);

  useEffect(() => {
      if(localStorage.getItem('token')) {
        user.setUser(jwt_decode(localStorage.getItem('token')));
        user.setIsAuth(true);
        check().then(data=> {
          if(localStorage.getItem('access')) {
            user.setIsAdmin(true);
          } else {
            user.setIsAdmin(false);
          }
        })
      } else {
        user.setUser(false);
        user.setIsAuth(false);
      }
  }, [])

  return (
    <BrowserRouter>
        <NavBar/>
        <AppRouter />
    </BrowserRouter>
  );
})

export default App;
