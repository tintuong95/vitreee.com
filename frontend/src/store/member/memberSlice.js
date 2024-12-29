// @ts-ignore

import {createSlice} from '@reduxjs/toolkit';
import {history} from '../../router/CustomerRouter';


const initialState = {
	memberId:null
};

export const memberSlice = createSlice({
	name: 'member',
	initialState,
	reducers: {
		pickMember: (state) => {
			state.memberId = 1;
			
		},

		statusLoggingFalse: (state) => {
			state.error.logging = false;
		},
	},
	
});

// Action creators are generated for each case reducer function
export const {evtLogout, statusLoggingFalse} = memberSlice.actions;

export default memberSlice.reducer;
