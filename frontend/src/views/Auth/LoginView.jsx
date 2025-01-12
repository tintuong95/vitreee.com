import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Checkbox, Form, Input } from 'antd';
import { SlLogin } from 'react-icons/sl';
// import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TbUserScan } from 'react-icons/tb';
import { getMessageErrors, optionValidate } from '../../helper/validate';
import Logo from '../../components/Logo';
import { useDispatch } from 'react-redux';
import { actionAuthLogin } from '../../store/auth/authAction';
import { FcGoogle } from 'react-icons/fc';
import { RiFacebookCircleFill } from 'react-icons/ri';
import BgLogin from "../../assets/bg-login.jpg"
function LoginView(props) {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	const [fail, setFail] = useState(false);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const onFinish = () => {
		setFail(false);
		setLoading(true);

		setErrors([]);
		// @ts-ignore
		const fetchLogin = dispatch(actionAuthLogin(form.getFieldsValue()));

		fetchLogin
			.then((r) => {
				if (r?.error != null) {
					setFail(true);
				}
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
			className='flex  bg-gray-100 justify-center items-center h-screen w-screen'
		>
			<div className='  flex border  bg-gray-50  rounded  ' style={{ width: 700 }}>
				<div  className='px-10 py-4 w-1/2'>
					<div className='flex gap-2 items-center justify-center'>
						<Logo />
					</div>

					<div className='mb-1 text-center   text-sm text-gray-400'>
						Đăng nhập với tài khoản
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
						className='mt-3'
						name='basic'
						layout='vertical'
						autoComplete='off'
					>
						<label
							htmlFor='password'
							className='block mb-2   text-gray-900 dark:text-white'
						>
							Email
						</label>
						<Form.Item
							label='Email'
							name='email'
							noStyle={true}
							validateStatus={form.getFieldError('email') ? '' : 'error'}
							// @ts-ignore
							rules={optionValidate(true, null, null, 5, 25, 'email')}
						>
							<Input placeholder='example@vitreee.com' />
						</Form.Item>
						<div className='my-4'></div>
						<label
							htmlFor='password'
							className='block mb-2   text-gray-900 dark:text-white'
						>
							Mật khẩu
						</label>
						<Form.Item
							label='Password'
							name='password'
							noStyle={true}
							validateStatus={form.getFieldError('password') ? '' : 'error'}
							// @ts-ignore
							rules={optionValidate(true, null, null, 5, 25, 'password')}
						>
							<Input className='txtPassword' placeholder='*********' />
						</Form.Item>
						<div className='my-5'>
							{errors.length > 0 && (
								<Alert
									className='rounded mt-5'
									message={
										<div className='flex flex-col text-gray-500' style={{ fontSize: 13 }}>
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
										<div className='flex flex-col text-gray-500' style={{ fontSize: 13 }}>
											{'Incorrect email or password. Please try again.'}
										</div>
									}
									type='warning'
								/>
							)}
						</div>
						<Form.Item>
							<Button
								loading={loading}
								icon={<SlLogin />}
								className='w-full mt-2 font-semibold'
								type='primary'
								htmlType='submit'
							>
								ĐĂNG NHẬP
							</Button>
						</Form.Item>

						<div className='flex justify-between items-center'>
							<div>Bạn chưa có tài khoản ?</div>
							<Button
								onClick={() => {
									navigate('/sign-up');
								}}
								type='link'
							>
								Đăng ký
							</Button>
						</div>
					</Form>
					<div className='flex flex-col gap-3'>
						<Button
							loading={loading}
							// icon={<SlLogin />}
							className='w-full mt-2 font-semibold bg-gray-200'
							type='default'
							htmlType='submit'
						>
							<FcGoogle size={20} />
						</Button>
						<Button
							loading={loading}
							// icon={<SlLogin />}
							className='w-full mt-2 font-semibold bg-gray-200'
							type='default'
							htmlType='submit'
						>
							<RiFacebookCircleFill size={20} />
						</Button>
					</div>
				</div>
				<div className='w-1/2 relative'>
					<img className='w-full h-full object-cover filter grayscale ' alt="bg" src={BgLogin}/>
					<div className='absolute bottom-1/2 -right-36 transform -rotate-90 font-extrabold text-5xl text-white'>VITREEE.COM</div>
				</div>
				{/* <div style={{width: 50}} className=' bg-orange-500 opacity-70 '>
					<div className='  flex justify-center items-center -rotate-90'></div>
				</div> */}
			</div>
		</div>
	);
}

LoginView.propTypes = {};

export default LoginView;
