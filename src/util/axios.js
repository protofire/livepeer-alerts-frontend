// Set config defaults when creating the instance
import { AXIOS_BASE_URL } from '../common/constants'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: AXIOS_BASE_URL
})

export default axiosInstance
