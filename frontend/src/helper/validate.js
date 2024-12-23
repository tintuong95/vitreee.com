// export const optionValidate = (
// 	required,
// 	min,
// 	max,
// 	minLength,
// 	maxLength,
// 	key
// ) => {
// 	let rules = [];
// 	if (required)
// 		rules.push({
// 			required: true,
// 			message: `Vui lòng nhập ${String(key).toLocaleLowerCase()}. `,
// 		});
// 	if (min)
// 		rules.push({
// 			type: 'number',
// 			min: min,
// 			message: `Giá trị ${String(key).toLocaleLowerCase()}  nhỏ nhất ${min}`,
// 		});
// 	if (max)
// 		rules.push({
// 			type: 'number',
// 			max: max,
// 			message: ` Giá trị ${String(key).toLocaleLowerCase()} lớn nhất ${max}`,
// 		});
// 	if (minLength)
// 		rules.push({
// 			min: minLength,
// 			message: ` Độ dài ${String(key).toLocaleLowerCase()} tối thiểu ${minLength} ký tự.`,
// 		});
// 	if (maxLength)
// 		rules.push({
// 			max: maxLength,
// 			message: ` Độ dài tối đa ${maxLength} ký tự.`,
// 		});
// 	return rules;
// };

// export const getMessageErrors = (data) => {
// 	return data?.reduce((accumulator, item) => {
// 		// Thêm tất cả các lỗi của mỗi mục vào mảng tổng
// 		accumulator.push(...item.errors);
// 		return accumulator;
// 	}, []);
// };

// export const validateConfirmPassword = ({getFieldValue}) => ({
// 	validator(_, value) {
// 		if (!value || getFieldValue('newPassword') == value) {
// 			return Promise.resolve();
// 		}
// 		return Promise.reject(`Mật khẩu không khớp.`);
// 	},
// });

// export const validatePassword = (_, value) => {
// 	// Define your custom password pattern using a regular expression
// 	const passwordPattern =
// 		/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// 	if (value && !passwordPattern.test(value)) {
// 		return Promise.reject(
// 			'Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường, một chữ số và một ký tự đặc biệt.'
// 		);
// 	}

// 	return Promise.resolve();
// };
// export const validateEmail = (_, value) => {
// 	// Define a basic email validation regular expression
// 	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 	if (value && !emailPattern.test(value)) {
// 		return Promise.reject('Không phải định dạng mail.');
// 	}

// 	return Promise.resolve();
// };
export const optionValidate = (
	required,
	min,
	max,
	minLength,
	maxLength,
	key
) => {
	let rules = [];
	if (required)
		rules.push({
			required: true,
			message: `Please enter ${String(key).toLocaleLowerCase()}.`,
		});
	if (min)
		rules.push({
			type: 'number',
			min: min,
			message: `The minimum value for ${String(key).toLocaleLowerCase()} is ${min}.`,
		});
	if (max)
		rules.push({
			type: 'number',
			max: max,
			message: `The maximum value for ${String(key).toLocaleLowerCase()} is ${max}.`,
		});
	if (minLength)
		rules.push({
			min: minLength,
			message: `The minimum length for ${String(key).toLocaleLowerCase()} is ${minLength} characters.`,
		});
	if (maxLength)
		rules.push({
			max: maxLength,
			message: `The maximum length is ${maxLength} characters.`,
		});
	return rules;
};

export const getMessageErrors = (data) => {
	return data?.reduce((accumulator, item) => {
		// Add all errors of each item to the accumulated array
		accumulator.push(...item.errors);
		return accumulator;
	}, []);
};

export const validateConfirmPassword = ({ getFieldValue }) => ({
	validator(_, value) {
		if (!value || getFieldValue('newPassword') === value) {
			return Promise.resolve();
		}
		return Promise.reject(`Passwords do not match.`);
	},
});

export const validatePassword = (_, value) => {
	// Define your custom password pattern using a regular expression
	const passwordPattern =
		/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	if (value && !passwordPattern.test(value)) {
		return Promise.reject(
			'The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
		);
	}

	return Promise.resolve();
};

export const validateEmail = (_, value) => {
	// Define a basic email validation regular expression
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (value && !emailPattern.test(value)) {
		return Promise.reject('Invalid email format.');
	}

	return Promise.resolve();
};
