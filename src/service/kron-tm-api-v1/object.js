import {$axios} from "./service.js";

const url = 'object';

class ObjectApi {

    getAllObjects() {
        return $axios.get(url);
    }

    getAllMonitoringObjects() {
        return $axios.get(url + "/monitoring");
    }

    getOneObject(id) {
        return $axios.get(url + "/" + id);
    }

    getAllObjectTypes() {
        return $axios.get(url + "/types");
    }

    createObject(objectdata) {
        return $axios.post(url, objectdata)
    }

}

export default new ObjectApi();