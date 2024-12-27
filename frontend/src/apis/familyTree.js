import {axios} from '../conf/axios';

export const apiGetListFamilyTree = (params) =>
	axios.get('/familyTree/list', {params});

export const apiCreateFamilyTree = (data) =>
	axios.post(`/familyTree/create`, data);

export const apiFamilyTreeDetails = (id) =>
	axios.get(`/familyTree/${id}/details`);

export const apiFamilyTreeUpdate = (id, data) =>
	axios.put(`/familyTree/${id}/update`, data);

export const apiFamilyTreeRemove = (id) =>
	axios.delete(`/familyTree/${id}/remove`);
