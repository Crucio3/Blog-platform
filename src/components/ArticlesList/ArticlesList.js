import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Pagination } from 'antd';
import { nanoid } from 'nanoid';

import { fetchArticlesLogin, fetchArticlesLogout } from '../../store/slices/GetArticlesSlices.js';
import ArticleCard from '../ArticleCard/ArticleCard.js';

import classes from './ArticlesList.module.scss';

const ArticleList = () => {
  const dispatch = useDispatch();

  const articles = useSelector((state) => state.articles.articles || []);
  const loading = useSelector((state) => state.articles.loading);
  const local = localStorage.getItem('user');

  useEffect(() => {
    if (local === null) {
      dispatch(fetchArticlesLogout(1));
    } else {
      dispatch(fetchArticlesLogin(1));
    }
  }, [dispatch, local]);

  const articlesKeys = useMemo(() => articles.map((item) => ({ ...item, key: nanoid() })), [articles]);
  const list = articlesKeys.map((item) => {
    return <ArticleCard key={item.key} article={item} isChild={false} />;
  });

  const pagination = (
    <Pagination
      total={50}
      align="center"
      onChange={(page) => {
        if (local === null) {
          dispatch(fetchArticlesLogout(page));
        } else {
          dispatch(fetchArticlesLogin(page));
        }
      }}
    />
  );

  const content = loading ? <Spin size="large" /> : list;

  return (
    <div className={classes.list}>
      {content}
      {pagination}
    </div>
  );
};

export default ArticleList;
