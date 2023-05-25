import objectapi from "../service/kron-tm-api-v1/object.js";
import eventapi from "../service/kron-tm-api-v1/event.js";
import categoryapi from "../service/kron-tm-api-v1/category.js";
import propertyapi from "../service/kron-tm-api-v1/property.js";

export default {
    state() {
        return {
            objects: null,
            selectedObject: null,
            options: {types: null, events: null, categories: null, properties: null}
        }
    },
    getters: {},
    mutations: {
        setObjects(state, objects) {
            state.objects = objects;
        },
        setSelectedObject(state, selectedObject) {
            state.selectedObject = selectedObject;
        },
        setTypes(state, options) {
            state.options.types = options;
        },
        setEvents(state, options) {
            state.options.events = options;
        },
        setCategories(state, options) {
            state.options.categories = options;
        },
        setProperties(state, options) {
            state.options.properties = options;
        },
    },
    actions: {
        async getObjects({commit}) {
            return await objectapi.getAllObjects().then(res => {
                commit('setObjects', res.data);
            });
        },
        async getTypes({commit}) {
            return await objectapi.getAllObjectTypes().then(res => {
                commit('setTypes', res.data);
            });
        },
        async getEvents({commit}) {
            return await eventapi.getAllEventTypes().then(res => {
                commit('setEvents', res.data);
            });
        },
        async getCategories({commit}) {
            return await categoryapi.getAllCategoryTypes().then(res => {
                commit('setCategories', res.data);
            });
        },
        async getProperties({commit}) {
            return await propertyapi.getAllPropertyTypes().then(res => {
                commit('setProperties', res.data);
            });
        }
    }
}