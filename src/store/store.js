import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './slices/GetArticlesSlices.js';
import userDataReducer from './slices/UserDataSlices.js';

const store = configureStore({
  reducer: { articles: articlesReducer, data: userDataReducer },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
