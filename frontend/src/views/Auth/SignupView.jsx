import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, Checkbox, Form, Input} from 'antd';
import {SlLogin} from 'react-icons/sl';
import {useNavigate} from 'react-router-dom';
import {
	getMessageErrors,
	optionValidate,
	validateConfirmPassword,
	validateEmail,
	validatePassword,
} from '../../helper/validate';
import {TbUserScan} from 'react-icons/tb';
import Logo from '../../components/Logo';

function SignupView(props) {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [errors, setErrors] = useState([]);
	const [fail, setFail] = useState(false);
	const [verify, setVerify] = useState(false);
	const [loading, setLoading] = useState(false);

	const onFinish = () => {
		setFail(false);
		setVerify(false);
		setErrors([]);
		setLoading(true);

		const data = form.getFieldsValue();
		const member = {
			username: data.username,
			password: data.password,
			email: data?.email,
		};
		delete data.username;
		delete data.password;
		const payload = {
			account: data,
			member,
		};
		const type = dispatch(signupAction(payload));
		type
			.then((r) => {
				console.log('r', r);
				if (r?.error != null) {
					setFail(true);
				}
				if (r?.type == 'SIGNUP_ACTION/fulfilled') {
					setVerify(true);
				}
				form.resetFields();
			})

			.catch((e) => {
				console.log('e', e);
			})
			.finally((R) => {
				setLoading(false);
			});
	};
	return (
		<div
			id='auth'
			className='flex bg-gray-100 justify-center items-center h-screen w-screen'>
			<div style={{width: 350}} className=' bg-gray-50  border  rounded '>
				<div className='p-10'>
					<div className='flex gap-2 items-center justify-center'>
						<Logo />
					</div>
					<div className='mb-4 text-center  text-sm text-gray-400'>
						Đăng ký tài khoản
					</div>
					{/* <div className='uppercase mb-6 text-xs text-end text-gray-400'>
						Tư Vấn - Thiết Kế - Xây Dựng
					</div> */}
					<Form
						form={form}
						onFinish={onFinish}
						onFinishFailed={() => {
							setFail(false);
							setErrors(getMessageErrors(form.getFieldsError()));
						}}
						className='mt-2'
						name='basic'
						layout='vertical'
						autoComplete='off'>
						<label
							htmlFor='email'
							className='block mb-2   text-gray-900 dark:text-white mt-2'>
							Email
						</label>
						<Form.Item
							noStyle={true}
							validateStatus={form.getFieldError('email') ? '' : 'error'}
							rules={[
								...optionValidate(true, null, null, null, null, 'email'),
								{validator: validateEmail},
							]}
							label='Email'
							name='email'>
							<Input placeholder='admin@company.com' />
						</Form.Item>

						<label
							htmlFor='password'
							className='block mb-2   text-gray-900 dark:text-white mt-2'>
							Password
						</label>
						<Form.Item
							noStyle={true}
							validateStatus={form.getFieldError('password') ? '' : 'error'}
							rules={[{validator: validatePassword}]}
							label='Mật khẩu'
							name='password'>
							<Input className='txtPassword' placeholder='*********' />
						</Form.Item>
						<label
							htmlFor='password'
							className='block mb-2   text-gray-900 dark:text-white mt-2'>
							RePassword
						</label>
						<Form.Item
							noStyle={true}
							validateStatus={form.getFieldError('password') ? '' : 'error'}
							rules={[{validator: validatePassword}]}
							label='Mật khẩu'
							name='password'>
							<Input className='txtPassword' placeholder='*********' />
						</Form.Item>
						{errors.length > 0 && (
							<Alert
								className='rounded mt-5'
								message={
									<div className='flex flex-col text-gray-500' style={{fontSize: 13}}>
										{errors?.map((o, i) => (
											<div key={i}>{o}</div>
										))}
									</div>
								}
								type='warning'
							/>
						)}
						{fail && (
							<Alert
								className='rounded mt-5'
								message={
									<div className='flex flex-col text-gray-500' style={{fontSize: 13}}>
										{'Đăng ký thất bại. Vui lòng thử lại.'}
									</div>
								}
								type='warning'
							/>
						)}
						{verify && (
							<Alert
								className='rounded mt-5'
								message={
									<div className='flex flex-col text-gray-500' style={{fontSize: 13}}>
										{'Đăng ký thành công. Đang đợi xác minh.'}
									</div>
								}
								type='success'
							/>
						)}
						<Form.Item>
							<Button
								loading={loading}
								icon={<SlLogin />}
								className='w-full mt-5 font-semibold'
								type='primary'
								htmlType='submit'>
								ĐĂNG KÝ
							</Button>
						</Form.Item>
						<div className='flex justify-between items-center'>
							<div>Bạn đã có tài khoản ?</div>
							<Button
								onClick={() => {
									navigate('/login');
								}}
								type='link'>
								Đăng nhập
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
}

SignupView.propTypes = {};

export default SignupView;
