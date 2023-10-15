import axios,{AxiosInstance} from "axios"
// import qs from 'qs'
const isDev = process.env.NODE_ENV === 'development';
const myAxios: AxiosInstance = axios.create({
    // 全局的baseUrl
    baseURL: isDev ? "http://localhost:8080/api" : 'http://42.193.201.114:8081/api'
});
myAxios.defaults.withCredentials = true; // 允许携带cookie

// Add a request interceptor 请求拦截器
myAxios.interceptors.request.use(function (config) {
    console.log("我要发送请求啦！",config)
    // Do something before request is sent
    // if(config.method = 'post'){
    //   config.data = qs.stringify(config.data)
    // }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
// Add a response interceptor 相应拦截器
myAxios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("我接受到响应啦",response)
    // 未登录自动跳转到登录页面
    if(response?.data?.code === 40100){
      window.location.href = '/user/login'
    }
    // 去掉axios封装的一层data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


export default myAxios;
