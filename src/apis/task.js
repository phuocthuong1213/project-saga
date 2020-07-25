import axiosService from './../container/commons/axiosService';
import { API_ENDPOINT } from './../constants';

const url = 'tasks';

export const getListTask = () => {
    return axiosService.get(`${API_ENDPOINT}/${url}`);
}