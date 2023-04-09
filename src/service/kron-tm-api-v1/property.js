import {$axios} from "./service.js";

const url = 'property';

class PropertyApi {

    getObjectProperties(id) {
        return $axios.get(url + '/object/' + id);
    }

    getAllPropertyTypes() {
        return $axios.get(url + '/types');
    }

}

export default new PropertyApi();