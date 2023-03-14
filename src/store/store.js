import { createStore } from 'vuex';
import user from "./user";
import objects from "./objects";

export const store = createStore({
    modules: {
        user,
        objects
    }
});