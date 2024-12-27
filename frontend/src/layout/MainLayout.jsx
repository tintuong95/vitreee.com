import { Button, Layout } from 'antd';
import React from 'react';
import { BiSupport } from 'react-icons/bi';
import { FaRegRectangleList } from 'react-icons/fa6';
import { Outlet, useNavigate } from 'react-router-dom';
// import { evtLogout } from '../Store/reducers/auth';
import { MdOutlineAccountCircle } from 'react-icons/md';
import Logo from '../components/Logo';

const { Content } = Layout;
function MainLayout() {
	// const dispatch = useDispatch();
	const navigate = useNavigate();
	// const {username} = useSelector((state) => state?.auth);
	// const {emitter} = useMitt();
	// const [pending, setPending] = useState(false);

	return (
		<>
			{/* <Loading state={pending} /> */}

			<div className='flex'>
				<div
					className='border-r fixed left-0 top-0 h-screen  bg-white'
					style={{ width: 220 }}
				>
					<div className='font-bold text-2xl  text-center  mt-5  flex items-center justify-center'>
						<Logo />
					</div>
					{/* <div className=' text-sm text-center mb-5 italic text-gray-500'>
						Family Tree
					</div> */}
					<div className='flex flex-col p-5 px-8 gap-6 justify-start  '>
						<Button
							className='border-blue-300 hover:text-white hover:bg-blue-300 text-blue-400'
							onClick={() => {
								navigate('/du-an');
							}}
							type='default'
						>
							<FaRegRectangleList />
							Dự án
						</Button>
						<Button
							className='border-blue-300 hover:text-white hover:bg-blue-300 text-blue-400'
							onClick={() => {
								navigate('/construction');
							}}
							type='default'
						>
							<BiSupport />
							Hỗ trợ
						</Button>
						<Button
							className='border-blue-300 hover:text-white hover:bg-blue-300 text-blue-400'
							onClick={() => {
								navigate('/account');
							}}
							type='default'
						>
							<MdOutlineAccountCircle />
							Tài khoản
						</Button>
					</div>

					<div className='flex flex-col justify-start' />
				</div>
				<div className='w-full' style={{ marginLeft: 220 }}>
					<Content className=''>
						<Outlet />
					</Content>
				</div>
			</div>
		</>
	);
}
export default MainLayout;
