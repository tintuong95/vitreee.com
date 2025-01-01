import React from 'react';
import PropTypes from 'prop-types';
import { IoArrowBack } from 'react-icons/io5';
import { Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

function BackLayout(props) {
        const navigate = useNavigate();
    
	return (
		<div className='flex flex-col'>
			<div className='mb-1 flex items-center justify-between bg-gray-50 shadow-sm py-2'>
				<Button
					onClick={() => navigate(-1)}
					type='link'
					className='text-sm flex items-center gap-2 text-black'
				>
					{' '}
					<IoArrowBack className='animate-pulse' />
					Trở lại
				</Button>
			</div>
			<Outlet />
		</div>
	);
}

BackLayout.propTypes = {};

export default BackLayout;
