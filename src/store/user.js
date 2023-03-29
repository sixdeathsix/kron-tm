import authapi from "../service/auth";

export default {
    state() {
        return {
            user: {
                token: localStorage.getItem('token') || null,
                username: localStorage.getItem('username') || null,
                user_role: localStorage.getItem('user_role') || null
            }
        }
    },
    getters: {},
    mutations: {
        setToken(state, token) {
            state.user.token = token;
            localStorage.setItem('token', token);
        },

        setUsername(state, username) {
            state.user.username = username;
            localStorage.setItem('username', username);
        },

        setUserRole(state, user_role) {
            state.user.user_role = user_role;
            localStorage.setItem('user_role', user_role);
        }
    },
    actions: {
        onLogin({commit}, {username, password}) {
            return authapi.login({username, password}).then((res) => {
                commit('setToken', res.data.accessToken);
                commit('setUsername', res.data.username);
                commit('setUserRole', res.data.role);
                location.reload();
            });
        },

        onRegister({commit}, {surname, name, patronymic, email, phone, username, password}) {
            return authapi.register({surname, name, patronymic, email, phone, username, password}).then((res) => {
                commit('setToken', res.data.accessToken);
                commit('setUsername', res.data.username);
                commit('setUserRole', res.data.role);
                location.reload();
            })
        },

        onLogout() {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('user_role');
            location.reload();
        }
    }
}