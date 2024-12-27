import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {testApi} from '../../../apis/test';

export const fetchUserById = createAsyncThunk(
	'users/fetchByIdStatus',
	async (_, thunkAPI) => {
		const response = await testApi();
		return response.data;
	}
);

export const counterSlice = createSlice({
	name: 'counter',
	initialState: {
		value: 0,
	},
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		incrementByAmount: (state, action) => {
			state.value += action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserById.fulfilled, (state, action) => {
			console.log(action);
		});
		builder.addCase(fetchUserById.rejected, (state) => {
			console.log(state);
		});
	},
});

// Action creators are generated for each case reducer function
export const {increment, decrement, incrementByAmount} = counterSlice.actions;

export default counterSlice.reducer;
