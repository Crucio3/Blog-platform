import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import ReactMarkdown from 'react-markdown';

import { fetchOneArticle } from '../../store/slices/GetArticlesSlices.js';
import ArticleCard from '../ArticleCard/ArticleCard.js';

import classes from './FullArticle.module.scss';

const FullArticle = () => {
  const dispatch = useDispatch();

  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchOneArticle(slug));
  }, [dispatch, slug]);

  const article = useSelector((state) => state.articles.oneArticle);

  const content =
    article === 'nothing' ? (
      <Spin size="large" />
    ) : (
      <ArticleCard article={article} isChild={true} slug={slug}></ArticleCard>
    );

  return (
    <div className={classes['article']}>
      {content}
      <ReactMarkdown>{article.body}</ReactMarkdown>
    </div>
  );
};

export default FullArticle;
