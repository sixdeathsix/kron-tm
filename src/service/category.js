import {$axios} from "./service";

const url = 'category';
class CategoryApi {

    getAllCategoryTypes() {
        return $axios.get(url + '/types');
    }

}

export default new CategoryApi();