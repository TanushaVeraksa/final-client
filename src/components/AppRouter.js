import {Route, Routes} from 'react-router-dom'
import {unauthRouter, authRouter, adminRouter} from '../routes'
import { useContext } from 'react';
import {Context} from '../index';
import {observer} from 'mobx-react-lite'

const AppRouter = observer(() => {
    const {user} = useContext(Context);
    return (
      <Routes>
        {unauthRouter.map(({path, Component}) => 
            <Route path={path} element={Component}/>
          )}
        {user.isAuth && authRouter.map(({path, Component}) => 
            <Route path={path} element={Component}/>
          )}
        {user.isAdmin && adminRouter.map(({path, Component}) => 
            <Route path={path} element={Component}/>
          )}
      </Routes>
    )
})
  
  export default AppRouter;