import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../store/auth/authSlice';

export default configureStore({
	reducer: {
		// counter: counterReducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
