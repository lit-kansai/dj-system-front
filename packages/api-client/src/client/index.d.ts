import aspida from '@aspida/axios';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { api } from '@/generated';
export declare const aspidaAxios: ({ requestInterceptor, responseInterceptor, responseErrorIntercepter }?: {
    requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig<{}>;
    responseInterceptor: (config: AxiosResponse) => AxiosResponse;
    responseErrorIntercepter: (error: AxiosError) => any;
}) => AxiosInstance;
export type GenerateApiClientInputs = {
    timeout: number;
    baseURL: string;
    withCredentials: boolean;
};
export declare const generateApiClient: (axios: AxiosInstance, { timeout, baseURL, withCredentials }: GenerateApiClientInputs) => ReturnType<typeof api<ReturnType<typeof aspida>>>;
export type ApiInstance = ReturnType<typeof generateApiClient>;
