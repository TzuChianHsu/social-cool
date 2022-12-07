   import axios from "axios";

    const map = new Map()
    // 创建一个新的http实例
    const http = axios.create({
        baseURL: "./",
        timeout: 5000,
        headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
    })

    // 取消请求
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    // axios的请求拦截器
    http.interceptors.request.use((config) => {
        // TODO: map判断 只是用来验证 是否可以取消请求，实际情况还要自行处理逻辑
        if (!map.has('url')) {
            map.set('url', config.url);
        } else {
            // 取消请求
            source.cancel();
        }
        
        // 配合后端 配置请求需要携带的参数
        config.headers!.token = 'token';
        // config.cancelToken = source.token;

        return config
    })


    // axios的返回值的拦截器
    http.interceptors.response.use((response) => {
        return response.data;
    }, (error) => {
        // 处理取消请求
        // if (axios.isCancel(error)) {
        //     console.log('Request canceled', error.message);
        // } else {
        //     // 处理错误 提示 根据请求返回状态码分别处理
        //     console.log(error)
        // }
         return Promise.reject(error)
    })

    export default http;
