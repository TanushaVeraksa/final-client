import {Route, Routes} from 'react-router-dom'
import {unauthRouter, authRouter, adminRouter} from '../routes'

const AppRouter = () => {
  
    return (
      <Routes>
        {unauthRouter.map(({path, Component}) => 
              <Route path={path} element={Component}/>
          )}
        {authRouter.map(({path, Component}) => 
              <Route path={path} element={Component}/>
          )}
        {adminRouter.map(({path, Component}) => 
              <Route path={path} element={Component}/>
          )}
      </Routes>
    )
}
  
  export default AppRouter