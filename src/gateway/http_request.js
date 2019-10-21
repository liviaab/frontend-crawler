import axios from 'axios'

const httpRequest = () => (axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 1000
}))

export default httpRequest
