import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

function DefaultLayout(props) {
	return (
		<div className=''>
			<Outlet />
		</div>
	);
}

DefaultLayout.propTypes = {};

export default DefaultLayout;
