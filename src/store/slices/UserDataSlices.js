import { createSlice } from '@reduxjs/toolkit';

const UserDataSlices = createSlice({
  name: 'userData',
  initialState: { data: { username: '', email: '', token: '', image: '' } },
  reducers: {
    getData: () => {
      if (JSON.parse(localStorage.getItem('user')) === null) {
        return { data: { username: '', email: '', token: '', image: '' } };
      } else {
        return { data: JSON.parse(localStorage.getItem('user')) };
      }
    },
    clearData: (state) => {
      state.data = { username: '', email: '', token: '', image: '' };
    },
  },
});

export const { getData, clearData } = UserDataSlices.actions;
export default UserDataSlices.reducer;
