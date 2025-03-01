import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticlesLogin = createAsyncThunk('articles/manyLogin', async (page) => {
  const response = await fetch(`https://blog-platform.kata.academy/api/articles?offset=${(page - 1) * 20}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
  const data = await response.json();
  return data.articles;
});

export const fetchArticlesLogout = createAsyncThunk('articles/manyLogout', async (page) => {
  const response = await fetch(`https://blog-platform.kata.academy/api/articles?offset=${(page - 1) * 20}`);
  const data = await response.json();
  return data.articles;
});

export const fetchOneArticle = createAsyncThunk('articles/one', async (slug) => {
  const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`);
  const data = await response.json();
  return data.article;
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: { articles: [], oneArticle: 'nothing', loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticlesLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticlesLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchArticlesLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticlesLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticlesLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOneArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.oneArticle = 'nothing';
      })
      .addCase(fetchOneArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.oneArticle = action.payload;
      })
      .addCase(fetchOneArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default articlesSlice.reducer;
