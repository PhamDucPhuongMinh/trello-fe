import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatter'
import { logoutUserAPI } from '~/redux/currentUser/currentUserSlice'
import { AppDispatch } from '~/redux/store'
import { refreshTokenAPI } from '~/apis'

let axiosDispatchReduxStore: AppDispatch | null = null
export const injectAxiosDispatchReduxStore = (dispatchReduxStore: AppDispatch) =>
  (axiosDispatchReduxStore = dispatchReduxStore)

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

let refreshTokenPromise: Promise<string | void> | null = null

axiosInstance.interceptors.response.use(
  response => {
    interceptorLoadingElements(false)
    return response
  },
  error => {
    interceptorLoadingElements(false)
    const { response, config: originalRequest } = error

    // TH1: Nếu có lỗi 401 thì gọi api Logout
    if (response.status === 401) {
      if (axiosDispatchReduxStore) {
        axiosDispatchReduxStore(logoutUserAPI(false))
      }
    }

    // TH2: Nếu có lỗi 410 thì gọi api Refresh Token
    if (response.status === 410 && !originalRequest._retry) {
      originalRequest._retry = true
      if (!refreshTokenPromise) {
        // Tạo promise call api refresh token
        // Nếu có nhiều request thì chỉ gọi 1 lần
        refreshTokenPromise = refreshTokenAPI()
          .then(data => {
            return data.accessToken
          })
          .catch(error => {
            if (axiosDispatchReduxStore) {
              axiosDispatchReduxStore(logoutUserAPI(false))
              return Promise.reject(error)
            }
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }

      return refreshTokenPromise.then(() => {
        return axiosInstance(originalRequest)
      })
    }

    const errorMessage = response?.data?.message || error.message
    // Mã lỗi 410 để Refresh Token
    if (response.status !== 410) {
      toast.error(errorMessage)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
