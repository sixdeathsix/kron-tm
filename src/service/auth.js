import {$axios} from "./service";

const url = 'auth';
class AuthApi {


    login(userdata) {
        return $axios.post(url + "/autharization", userdata);
    }

    register(userdata) {
        return $axios.post(url + "/register", userdata);
    }

}

export default new AuthApi();