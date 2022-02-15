import { Categories } from "./views/Categories";
import { EditTrasactions } from "./views/EditTransaction";
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { NewCategory } from "./views/NewCategory";
import { NewTrasactions } from "./views/NewTransaction";
import { Register } from "./views/Register";
import { EditCategory } from "./views/EditCategory";


export const routes = [
    {
        path: '/',
        component: Home,
        auth: true
    },
    {
        path: 'new',
        component: NewTrasactions,
        auth: true
    },

    {
        path: ':id',
        component: EditTrasactions,
        auth: true
    },
    {
        path: 'categories',
        component: Categories,
        auth: true
    },
    {
        path: 'categories/new',
        component: NewCategory,
        auth: true
    },
    {
        path: 'categories/:id',
        component: EditCategory,
        auth: true
    },
    {
        path: 'login',
        component: Login,
        auth: false
    },
    {
        path: 'register',
        component: Register,
        auth: false
    },
]