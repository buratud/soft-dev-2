import axios from 'axios';

const instance = axios.create({});


instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log("kanchu: this is not cute")
    if (error.response.status == 401 || error.response.status == 403){
    window.location.href = '/';
    }
    return Promise.reject(error);
});

export default instance;