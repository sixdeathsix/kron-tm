import {$axios} from "./service";

const url = 'object';
class ObjectApi {


    getAllObjects() {
        return $axios.get(url);
    }

    getOneObject(id) {
        return $axios.get(url + "/" + id);
    }

    getAllObjectTypes() {
        return $axios.get(url + '/types');
    }

}

export default new ObjectApi();