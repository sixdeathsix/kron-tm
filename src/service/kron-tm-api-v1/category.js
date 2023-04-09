import {$axios} from "./service.js";

const url = 'category';

class CategoryApi {

    getAllCategoryTypes() {
        return $axios.get(url + '/types');
    }

}

export default new CategoryApi();