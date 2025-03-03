import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await fetch('https://blog-platform.kata.academy/api/user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await response.json();
  return data.user;
});

const UserDataSlices = createSlice({
  name: 'userData',
  initialState: { data: { username: '', email: '', token: '', image: '' }, loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  reducers: {
    clearData: (state) => {
      state.data = { username: '', email: '', token: '', image: '' };
    },
  },
});

export const { getData, clearData } = UserDataSlices.actions;
export default UserDataSlices.reducer;
