import React, { useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';

export const history = createBrowserHistory();

export const CustomRouter = ({basename, children, history}) => {
	const [state, setState] = useState({
		action: history.action,
		location: history.location,
	});

	useLayoutEffect(() => history.listen(setState), [history]);

	return (
		<Router
			basename={basename}
			location={state.location}
			navigationType={state.action}
			navigator={history}>
			{children}
		</Router>
	);
};

CustomRouter.propTypes = {
	basename: PropTypes.string,
	children: PropTypes.node,
	history: PropTypes.any,
};