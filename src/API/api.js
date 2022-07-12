import * as axios from "axios";
// import {signup} from "../redux/auth_reducer";
// import {cancelOrder} from "../redux/order_reducer";
// import {setCurrentPage} from "../redux/users_reducer";

let apiKey = 'vf8rdf8-df7f6drf-334h4jrfd-dfx78vrf';
// let apiKey = '3db08625-24f8-429d-8bdb-ea405db0921e'
// baseURL = 'https://wd.co.ua/api.php'
let baseURL = 'https://booking.wd.co.ua/api/1.0/'
// currPage = 4
export let instance = axios.create({
    withCredentials: true,
    baseURL: baseURL,
    headers: {
        'API-KEY': apiKey,
        // 'Access-Control-Allow-Origin5': 'test'
    }

});


export const API = {


    getBooking(selectedDate) {
        return instance
            .get('booking'+(selectedDate!==undefined ? '&selectedDate='+selectedDate : ''))
            .then(resp => {
                    //console.log(resp);
                    //resp.data.cp = currentPage;
                    return resp.data.data.main_data
                }
            )
            .catch(error => { // catches errors
                return error.response
                // error handling, use error.response to access the non 2xx response
            });
    },
    uploadBooking(bookingData = '') {
        return instance
            .post('booking&add',{
                bookingData: bookingData
            })
            .then(resp => {
                    //console.log(resp);
                    //resp.data.cp = currentPage;
                    return resp.data.data.main_data
                }
            )
            .catch(error => { // catches errors
                return error.response
                // error handling, use error.response to access the non 2xx response
            });


            
    },

}
