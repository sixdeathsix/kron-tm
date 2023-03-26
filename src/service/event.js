import {$axios} from "./service";

const url = 'event';
class EventApi {

    getOneObjectEvents(id, date_start, date_end) {
        return $axios.get(url + "/" + id + `?date_start=${date_start}&date_end=${date_end}`);
    }

    getAllEventTypes() {
        return $axios.get(url + '/types');
    }

}

export default new EventApi();