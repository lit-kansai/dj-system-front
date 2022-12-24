import aspida from '@aspida/axios'
import axios from 'axios'
import api from '@/sample/api/$api'

export const sampleApiClient = api(
  aspida(axios, {
    timeout: 3000,
    baseURL: 'https://jsonplaceholder.typicode.com',
  })
)

export * from '@/sample/api/$api'
