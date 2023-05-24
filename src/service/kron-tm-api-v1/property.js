import {$axios} from "./service.js";

const url = 'property';

class PropertyApi {

    getObjectProperties(id) {
        return $axios.get(url + '/object/' + id);
    }

    getAllPropertyTypes() {
        return $axios.get(url + '/types');
    }

    getAllValues() {
        return $axios.get(url + '/values');
    }

    addPropertyForObject(postdata) {
        return $axios.post(url, postdata);
    }

    deleteObjectProperty(property_id) {
        return $axios.delete(url + `?property_id=${property_id}`)
    }

}

export default new PropertyApi();