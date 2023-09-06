import {Route, Routes} from 'react-router-dom'
import {unauthRouter, authRouter} from '../routes'
import { useContext } from 'react';
import {Context} from '../index'

const AppRouter = () => {
    const {user} = useContext(Context);
    return (
      <Routes>
        {unauthRouter.map(({path, Component}) => 
              <Route path={path} element={Component}/>
          )}
        {user.isAuth && authRouter.map(({path, Component}) => 
              <Route path={path} element={Component}/>
          )}
      </Routes>
    )
}
  
  export default AppRouter;