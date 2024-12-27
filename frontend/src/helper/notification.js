import {notification} from 'antd';

export const openNotification = (type, message, description) => {
	notification[type]({
		type,
		message,
		description,
		placement: 'topRight',
		onClick: () => {
			console.log('Notification Clicked!');
		},
	});
};
