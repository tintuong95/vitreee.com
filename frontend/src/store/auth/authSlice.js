// @ts-ignore

import {createSlice} from '@reduxjs/toolkit';
import {history} from '../../router/CustomerRouter';
import {
	actionAuthLogin,
	actionAuthProfile,
	actionAuthSignup,
} from './authAction';

const initialState = {
	isLogin: false, //bolean
	id: null,
	accountId: null,
	username: null,
	type: null,
	error: {
		logging: false,
	},
	loading: true,
	verify: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		evtLogout: (state) => {
			state.error.logging = false;
			state.loading = true;
			state.isLogin = false;
			localStorage.clear();
			history.push('/login');
		},

		statusLoggingFalse: (state) => {
			state.error.logging = false;
		},
	},
	extraReducers: (builder) => {
		//state, action
		builder.addCase(actionAuthLogin.fulfilled, (state, action) => {
			const user = action.payload;
			localStorage.setItem('accessToken', user.accessToken);
			localStorage.setItem('id', user.account.id);
			localStorage.setItem('fullName', user.account.fullName);
			localStorage.setItem('email', user.account.email);
			localStorage.setItem('phone', user.account.phone);
			localStorage.setItem('photo', user.account.photo);
			localStorage.setItem('dateOfBirth', user.account.dateOfBirth);
			state.isLogin = true;
			state.id = user.account.id;
			history.push('/');
		});

		builder.addCase(actionAuthLogin.rejected, (state) => {
			state.error.logging = true;
		});

		//state, action
		// @ts-ignore
		builder.addCase(actionAuthSignup.fulfilled, (state, action) => {
			// const user = action.payload;

			// localStorage.setItem('accessToken', user.accessToken);
			// localStorage.setItem('isLogin', JSON.stringify(true));
			// localStorage.setItem('id', user.id);
			// localStorage.setItem('accountId', user.accountId);
			// localStorage.setItem('username', user.username);
			// localStorage.setItem('nameHotel', user.nameHotel);
			// localStorage.setItem('expiredAt', user.expiredAt);
			// localStorage.setItem('type', user.type);
			// state.isLogin = true;
			// state.id = user.id;
			// state.accountId = user.accountId;
			// state.username = user.username;
			// state.nameHotel = user.nameHotel;
			// state.expiredAt = user.expiredAt;

			// history.push('/');
			state.verify = true;
		});

		builder.addCase(actionAuthSignup.rejected, (state) => {
			state.error.logging = true;
		});

		//state, action
		builder.addCase(actionAuthProfile.fulfilled, (state, action) => {
			const user = action.payload;

			// localStorage.setItem('accessToken', user.accessToken);
			// localStorage.setItem('isLogin', JSON.stringify(true));
			// localStorage.setItem('id', user.id);
			// localStorage.setItem('accountId', user.accountId);
			// localStorage.setItem('username', user.username);
			// localStorage.setItem('type', user.type);
			// localStorage.setItem('nameHotel', user.nameHotel);
			// localStorage.setItem('expiredAt', user.expiredAt);
			state.isLogin = true;
			// state.id = user.id;
			// state.accountId = user.accountId;

			// state.username = user.username;
			// state.nameHotel = user.nameHotel;
			// state.expiredAt = user.expiredAt;

			history.push('/');
		});

		builder.addCase(actionAuthProfile.rejected, (state) => {
			state.loading = false;
			history.push('/login');
		});
	},
});

// Action creators are generated for each case reducer function
export const {evtLogout, statusLoggingFalse} = authSlice.actions;

export default authSlice.reducer;
