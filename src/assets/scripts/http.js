import axios from 'axios'
import store from '@/store'
import {config} from '@/config'
// import { Spin } from 'iview'

const http = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro,
  timeout: 10000
})
// http request 拦截器
http.interceptors.request.use(
  config=>{
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
// 添加响应拦截器
http.interceptors.response.use(response => {
  const res = response
  return res
})
export default http
