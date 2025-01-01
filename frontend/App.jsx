import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainLayout from './src/layout/MainLayout';
import TreeRootPage from './src/views/TreeRoot/TreeRootPage';
import HomePage from './src/views/Home/HomePage';
import FamilyTreeBase from './src/views/FamilyTree/FamilyTreeBase';
import LoginView from './src/views/Auth/LoginView';
import SignupView from './src/views/Auth/SignupView';
import { useSelector } from 'react-redux';
import DefaultLayout from './src/layout/DefaultLayout';
import FamilyTreeUpdate from './src/views/FamilyTree/FamilyTreeUpdate';
import FamilyDetail from './src/views/FamilyTree/FamilyDetail';
import BackLayout from './src/layout/BackLayout';

function App(props) {
	const { isLogin } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='/project/:id/visual' element={<TreeRootPage />} />
				<Route path='/' element={<BackLayout />}>
					<Route path='/project' element={<FamilyTreeBase />} />
					<Route path='/project/:id/update' element={<FamilyTreeUpdate />} />
					<Route path='/project/:id/details' element={<FamilyDetail />} />
				</Route>

				<Route path='/' element={<HomePage />} />
			</Route>

			<Route path='/' element={<DefaultLayout />}>
				<Route path='/login' element={<LoginView />} />
				<Route path='/sign-up' element={<SignupView />} />
			</Route>
		</Routes>
	);
}

App.propTypes = {};

export default App;
