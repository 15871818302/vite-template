/*封装axios*/
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { get } from 'lodash-es'

// 创建请求实例
export const service = () => {
  // 创建一个axios实例
  const axiosService = axios.create()
  // 设置请求拦截器
  axiosService.interceptors.request.use(
    (config) => config,
    // 如果发送失败，返回失败结果
    (err) => Promise.reject(err)
  )
  // 设置响应拦截器
  axiosService.interceptors.response.use(
    (response) => {
      // 后端返回数据
      const apiData:any = response.data
      // 后端返回的状态码
      const code:any = apiData.code
      // 如果有其他第三方的接口，就直接返回错误
      if (code === undefined) {
        ElMessage.error('调用了第三方接口')
        return Promise.reject(new Error('调用了第三方接口'))
      } else {
        if (code === 200) {
          return apiData
        } else {
          ElMessage.error(apiData.message || '后台错误')
          return Promise.reject(new Error('后台错误'))
        }
      }
    },
    (err) => {
      ElMessage.error(err.message)
      return Promise.reject(new Error(err))
    }
  )

  return axiosService
}

// 设置具体的请求方法
export const http = (service: AxiosInstance) => {
  return (config: AxiosRequestConfig) => {
    const configDefault = {
      headers: {
        "Content-Type": get(config, "headers.Content-Type", "application/json")
      },
      // 设置超时时间
      timeout: 30000,
      baseURL: import.meta.env.VITE_BASE_API,
      data: {}
    }
    return service(Object.assign(configDefault, config))
  }
}
