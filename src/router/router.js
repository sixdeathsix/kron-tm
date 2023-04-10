import {
    createRouter,
    createWebHistory
} from 'vue-router';

import {store} from "../store/store";

let token = store.state.user.user.token;

function authGuard(to, from, next) {
    if (token == null) next({name: 'signin'})
    else next()
}

function noAuthGuard(to, from, next) {
    if (token != null) next({name: 'monitoring'})
    else next()
}

const routes = [
    {
        path: "/:pathMatch(.*)*",
        redirect: "/"
    },
    {
        path: "/",
        name: "monitoring",
        component: () => import("../pages/Monitoring.vue"),
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
    },
    {
        path: "/object/:id",
        name: "object",
        component: () => import("../pages/Object.vue"),
        beforeEnter: authGuard
    },
    {
        path: "/events",
        name: "events",
        component: () => import("../pages/Events.vue"),
        beforeEnter: authGuard
    },
    {
        path: "/checkerboard",
        name: "checkerboard",
        component: () => import("../pages/Сheckerboard.vue"),
        beforeEnter: authGuard
    },
    {
        path: "/twohours",
        name: "twohours",
        component: () => import("../pages/Twohours.vue"),
        beforeEnter: authGuard
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});