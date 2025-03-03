import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ArticleForm from '../ArticleForm/ArticleForm.js';

const EditArticle = () => {
  const { slug } = useParams();
  const { title, description, body, tagList } = useSelector((state) => state.articles.oneArticle);
  const token = localStorage.getItem('token');

  const updateArticle = async (data) => {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  };

  return (
    <ArticleForm
      updateArticle={updateArticle}
      slug={slug}
      title={title}
      description={description}
      body={body}
      tagList={tagList}
    />
  );
};

export default EditArticle;
