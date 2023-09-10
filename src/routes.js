import Home from './pages/Home';
import Review from './pages/Review';
import PersonalArea from './pages/PersonalArea';
import Authorization from './pages/Authorization';
import Admin from './pages/Admin';
import {HOME_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE, REVIEW_ROUTE, PERSONAL_ROUTE, ADMIN_ROUTE} from './utils/consts'

export const unauthRouter = [
    {
        path: HOME_ROUTE,
        Component: <Home/>
    },
    {
        path: REVIEW_ROUTE + '/:id',
        Component: <Review/>
    },
    {
        path: LOGIN_ROUTE,
        Component: <Authorization/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Authorization/>
    },
    {
        path: PERSONAL_ROUTE + '/:id',
        Component: <PersonalArea/>
    },
]

export const authRouter = [
    {
        path: PERSONAL_ROUTE + '/:id',
        Component: <PersonalArea/>
    },
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>
    },
    {
        path: REVIEW_ROUTE + '/:id',
        Component: <Review/>
    },
]

