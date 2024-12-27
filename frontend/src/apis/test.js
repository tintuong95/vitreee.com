import {axios} from '../conf/axios';

export const testApi = async () => {
	return await axios.get('https://jsonplaceholder.typicode.com/posts/1'); // Đổi URL theo API của bạn
};
