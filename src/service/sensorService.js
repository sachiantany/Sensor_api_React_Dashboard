import axios from 'axios';

export class sensorService{
    baseUrl = "http://localhost:8080/firealarm/"

    getAll(){
        return axios.get(this.baseUrl + "sensors")
            .then(res => res.data);
    }
}