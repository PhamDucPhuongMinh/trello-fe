import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatter'

const axiosInstance = axios.create()

axiosInstance.defaults.timeout = 1000 * 60 * 10
axiosInstance.defaults.withCredentials = true

axiosInstance.interceptors.request.use(
  config => {
    interceptorLoadingElements(true)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => {
    interceptorLoadingElements(false)
    return response
  },
  error => {
    interceptorLoadingElements(false)

    const { response } = error
    const errorMessage = response?.data?.message || error.message
    // Mã lỗi 410 để Refresh Token
    if (response.status !== 410) {
      toast.error(errorMessage)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
