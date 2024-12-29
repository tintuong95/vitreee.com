import {axios} from '../conf/axios';

export const apiGetListMember = (params) =>
	axios.get('/member/list', {params});

export const apiCreateMember = (data) =>
	axios.post(`/member/create`, data);

export const apiMemberDetails = (id) =>
	axios.get(`/member/${id}/details`);

export const apiMemberUpdate = (id, data) =>
	axios.put(`/member/${id}/update`, data);

export const apiMemberRemove = (id) =>
	axios.delete(`/member/${id}/remove`);
