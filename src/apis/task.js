import axiosService from './../container/commons/axiosService';
import { API_ENDPOINT } from './../constants';
import qs from 'query-string';
const url = 'tasks';

export const getListTask = (params = {}) => {
    let queryParams = '';
    if (Object.keys(params).length > 0) {
        queryParams = `?${qs.stringify(params)}`;
    }
    return axiosService.get(`${API_ENDPOINT}/${url}${queryParams}`);
}

export const addTask = data => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, data);
}

export const updateTask = (data, taskID) => {
    return axiosService.put(`${API_ENDPOINT}/${url}/${taskID}`, data);
}

export const deleteTask = taskId => {
    return axiosService.delete(`${API_ENDPOINT}/${url}/${taskId}`);
};