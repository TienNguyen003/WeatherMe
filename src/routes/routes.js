import routesConfig from '../config/routes';

// pages
import Home from '../pages/Home/home';
import Detail from '../pages/Detail/detail';

// public routes
const publicRoutes = [
    { path: routesConfig.Home, component: Home },
    { path: routesConfig.Detail, component: Detail },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
