import axios from 'axios';

export class sensorService{
    baseUrl = "http://localhost:8080/firealarm/"

/* Read API data from axios*/
    getAll(){
        return axios.get(this.baseUrl + "sensors")
            .then(res => res.data);
    }
}
