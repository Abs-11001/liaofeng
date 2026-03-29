import axios from 'axios'

const request = axios.create({
    baseURL: '/api',
    timeout: 3600,
})

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        console.error('网络请求出错了:', error)
        return Promise.reject(error)
    }
)

export default request