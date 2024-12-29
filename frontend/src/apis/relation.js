import {axios} from '../conf/axios';

export const apiGetListRelation = (params) =>
	axios.get('/relation/list', {params});

export const apiCreateRelation = (data) =>
	axios.post(`/relation/create`, data);

export const apiRelationDetails = (id) =>
	axios.get(`/relation/${id}/details`);

export const apiRelationUpdate = (id, data) =>
	axios.put(`/relation/${id}/update`, data);

export const apiRelationRemove = (id) =>
	axios.delete(`/relation/${id}/remove`);
