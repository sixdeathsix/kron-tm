import { createStore } from 'vuex';
import user from "./user";
import object from "./object";

export const store = createStore({
    modules: {
        user,
        object
    }
});