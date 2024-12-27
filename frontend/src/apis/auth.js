import {axios} from '../conf/axios';

export const apiAuthLogin = (data) => {
	return axios.post('/auth/login', data);
};

export const apiAuthSignup = (data) => {
	return axios.post('/auth/signup', data);
};

export const apiAuthProfile = () => {
	return axios.get('/auth/profile');
};
