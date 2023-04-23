import axios from "axios";
import {refreshToken} from "../apis/authApi";

const BACKEND_URL =  process.env.REACT_APP_BASE_BE;

let isRefreshing = false;

export const getIsRefreshing = () => isRefreshing;

export const setIsRefreshing = (val) => {
    isRefreshing = val;
};




const accessToken =
    localStorage.getItem('accessToken') || '';
const axiosClient = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    credentials: 'include',
    headers: {
        Authorization: `${accessToken}`
    },
    timeout: 60000,
});


let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};


// axiosClient.interceptors.request.use((config) => {
//     // Use latest 'accessToken' in auth header when reference is expired
//     const latestAccessToken = localStorage.getItem('accessToken');

//     // renew accessToken
//     if (latestAccessToken !== accessToken) {
//         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//         config.headers.Authorization = `${latestAccessToken}`;
//     }

//     config.withCredentials = true;

//     return config;
// });


// Response interceptor for API calls
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        let status = undefined;
        let message = undefined;
        if (error.response && error.response.data && error.response.data.status) {
            status = error.response.data.status
        }
        if (error.response && error.response.data && error.response.data.message) {
            message = error.response.data.message
        }
        if (error.response && status && status === 401 && originalRequest.url !== '/api/v1/auth/refresh-token' && !originalRequest._retry) {
            if (message && message === "Hết hạn phiên đăng nhập") {
                if (isRefreshing) {
                    return new Promise(function (resolve, reject) {
                        failedQueue.push({ resolve, reject });
                    })
                        .then(token => {
                            originalRequest.headers['Authorization'] = token;
                            return axios(originalRequest);
                        }) 
                        .catch(err => {
                            // return Promise.reject(err);
                            console.log(err)
                        });
                }
                originalRequest._retry = true;
                isRefreshing = true;
                return new Promise(function (resolve, reject) {
                    refreshToken()
                        .then(({ data: {
                            elements: { access_token },
                            status
                        } }) => {
                            axiosClient.defaults.headers.common['Authorization'] = access_token;
                            originalRequest.headers['Authorization'] = access_token;
                            processQueue(null, access_token);
                            resolve(axiosClient(originalRequest));
                        })
                        .catch(err => {
                            processQueue(err, null);
                            localStorage.removeItem('accessToken')
                            localStorage.removeItem('isLogged')
                            localStorage.removeItem('userAdmin')
                            localStorage.removeItem('userUI')
                            // window.location.href = "/";
                            window.location.href = "/login";
                            reject(err);
                        })
                        .then(() => {
                            isRefreshing = false;
                        });
                });
            }


                


            
        }

        console.log('errror axios :', error.response.data.message)

        if (error.response.data.message !== "jwt malformed"){
            return Promise.reject(error);
        }

        
    }
);


export default axiosClient;