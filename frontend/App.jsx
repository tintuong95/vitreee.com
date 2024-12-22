import React from 'react';
import {Route, Routes} from 'react-router-dom';
import MainLayout from './src/layout/MainLayout';
import TreeRootPage from './src/views/TreeRoot/TreeRootPage';
import HomePage from './src/views/Home/HomePage';
import FamilyTreeBase from './src/views/FamilyTree/FamilyTreeBase';

function App(props) {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='tree' element={<TreeRootPage />} />
				<Route path='/du-an' element={<FamilyTreeBase />} />
			</Route>
		</Routes>
	);
}

App.propTypes = {};

export default App;
