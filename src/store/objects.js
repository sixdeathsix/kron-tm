import {$axios} from "../service/service";
import objectapi from "../service/object";

export default {
    state() {
        return {
            objects: null
        }
    },
    getters: {},
    mutations: {
        setObjects(state, objects) {
            state.objects = objects;
        }
    },
    actions: {
        getObjects({commit}) {
            return objectapi.getAllObjects().then((res) => {
                commit('setObjects', res.data);
            });
        }
    }
}