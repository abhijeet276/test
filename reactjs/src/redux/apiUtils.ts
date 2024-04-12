import axios from 'axios';
import { RequestParams } from './serviceTypes';
import { store } from './store';
import { logout } from './slices/authSlice';
export const clearStorage = () => {
    window.localStorage.clear();
}
export const userLogout = async () => {
    try {
        const response = await axios.get('/api/v1/user/logout');
    } catch (error) {
        console.log(error)
    }
}
export const fetchDataFromApi = async <T>(
    endpoint: string,
    params?: RequestParams
): Promise<T> => {
    try {
        const response = await axios({
            url: endpoint,
            method: params?.method || 'GET',
            data: params?.data,
            headers: {
                'Content-Type': 'application/json',
            },
            ...params,
        });
        const data: T = response.data;
        return data;
    } catch (error: any) {
        return error
    }
};
