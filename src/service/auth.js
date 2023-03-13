import {$axios} from "./service";

const url = 'auth';
class UserApi {


    login(userdata) {
        return $axios.post(url + "/autharization", userdata);
    }

    register(userdata) {
        return $axios.post(url + "/register", userdata);
    }

}

export default new UserApi();