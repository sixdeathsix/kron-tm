import {$axios} from "./service.js";

const url = 'event';

class EventApi {

    getAllEvents(id, date_start, date_end) {
        return $axios.get(url + `?id=${id}&date_start=${date_start}&date_end=${date_end}`);
    }

    getOneObjectEvents(id, date_start, date_end) {
        return $axios.get(url + "/" + id + `?date_start=${date_start}&date_end=${date_end}`);
    }

    getAllEventTypes() {
        return $axios.get(url + '/types');
    }

    getTwohours(id, date) {
        return $axios.get(url + '/twohours' +`?id=${id}&date=${date}`);
    }

}

export default new EventApi();