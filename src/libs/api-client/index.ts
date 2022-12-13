import aspida from '@aspida/axios'
import axios from 'axios'
import api from '@/api/$api'

export const apiClient = api(
  aspida(axios, {
    timeout: 3000,
    baseURL: 'https://jsonplaceholder.typicode.com',
  })
)
