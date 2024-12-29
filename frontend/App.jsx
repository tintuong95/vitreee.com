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

function App(props) {
	const { isLogin } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	return (
		<Routes>
			
				<Route path='/' element={<MainLayout />}>
					<Route path='/pha-he/:id' element={<TreeRootPage />} />
					<Route path='/du-an' element={<FamilyTreeBase />} />
					<Route path='/du-an/:id/cap-nhat' element={<FamilyTreeUpdate />} />
					<Route path='/' element={<HomePage />} />
				</Route>
			
		
				<Route path='/' element={<DefaultLayout/>}>
					<Route path='/dang-nhap' element={<LoginView />} />
					<Route path='/dang-ky' element={<SignupView />} />
				</Route>
			
		</Routes>
	);
}

App.propTypes = {};

export default App;
