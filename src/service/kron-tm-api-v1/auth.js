import {$axios} from "./service.js";

const url = 'auth';

class AuthApi {

    login(userdata) {
        return $axios.post(url + "/autharization", userdata);
    }

    register(userdata) {
        return $axios.post(url + "/registration", userdata);
    }

}

export default new AuthApi();