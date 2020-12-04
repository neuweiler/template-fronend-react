import axios from 'axios';
import {Owner} from "../model/Owner";

const OWNER_API_BASE_URL = 'http://localhost:8081/owner'; //TODO use env specific URLs

export class ApiServiceOwner {

    fetch() {
        return axios.get(OWNER_API_BASE_URL);
    }

    fetchDetails(id: number) {
        return axios.get(OWNER_API_BASE_URL + '/' + id);
    }

    delete(id: number) {
        return axios.delete(OWNER_API_BASE_URL + '/' + id);
    }

    add(owner: Owner) {
        return axios.post(OWNER_API_BASE_URL, owner);
    }

    update(owner: Owner) {
        return axios.put(OWNER_API_BASE_URL, owner);
    }
}
