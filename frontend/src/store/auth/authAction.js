import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiAuthLogin, apiAuthProfile, apiAuthSignup} from '../../apis/auth';

const LOGIN_ACTION = 'LOGIN_ACTION';
const SIGNUP_ACTION = 'SIGNUP_ACTION';
const GET_PROFILE_ACTION = 'GET_PROFILE_ACTION';

export const actionAuthLogin = createAsyncThunk(
	LOGIN_ACTION,
	//payload, thunkAPI
	async (payload) => {
		return await apiAuthLogin(payload);
	}
);

export const actionAuthSignup = createAsyncThunk(
	SIGNUP_ACTION,
	//payload, thunkAPI
	async (payload) => {
		return await apiAuthSignup(payload);
	}
);

export const actionAuthProfile = createAsyncThunk(
	GET_PROFILE_ACTION,
	//payload, thunkAPI
	async (payload) => {
		return await apiAuthProfile();
	}
);
