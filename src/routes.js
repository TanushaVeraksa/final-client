import Home from './pages/Home';
import Movies from './pages/Movies';
import PersonalArea from './pages/PersonalArea';
import Authorization from './pages/Authorization';
import {HOME_ROUTE, REGISTRATION_ROUTE, AUTH_ROUTE, MOVIES_ROUTE, PERSONAL_ROUTE} from './utils/consts'

export const unauthRouter = [
    {
        path: HOME_ROUTE,
        Component: <Home/>
    },
    {
        path: MOVIES_ROUTE,
        Component: <Movies/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Authorization/>
    },
    {
        path: AUTH_ROUTE,
        Component: <Authorization/>
    },
]

export const authRouter = [
    {
        path: PERSONAL_ROUTE,
        Component: <PersonalArea/>
    },
]

export const adminRouter = [

]