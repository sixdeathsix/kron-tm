import {
    createRouter,
    createWebHistory
} from 'vue-router';

import { store } from "../store/store";

let token = store.state.user.user.token;

function authGuard(to, from ,next) {
    if (token == null) next({ name: 'signin' })
    else next()
}

function noAuthGuard(to, from ,next) {
    if (token != null) next({ name: 'home' })
    else next()
}

const routes = [
    {
        path: "/:pathMatch(.*)*",
        redirect: "/"
    },
    {
        path: "/",
        name: "home",
        component: () => import("../pages/Home.vue"),
        beforeEnter: authGuard
    },
    {
        path: "/signin",
        name: "signin",
        component: () => import("../pages/Signin.vue"),
        beforeEnter: noAuthGuard
    },
    {
        path: "/signup",
        name: "signup",
        component: () => import("../pages/Signup.vue"),
        beforeEnter: noAuthGuard
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});