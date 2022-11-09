import { routes } from '../configs/routes';
import FormAddUsers from '../form/FormAddUsers';
import FormLogin from '../form/FormLogin';
import FormUpdateUser from '../form/FormUpdateUsers';
import Home from '../page/Home';

const Routers = [
    { path: routes.add, component: FormAddUsers },
    { path: routes.update, component: FormUpdateUser },
    { path: routes.home, component: Home },
];

const RouterPublic = [{ path: routes.login, component: FormLogin }];

export { Routers, RouterPublic };
