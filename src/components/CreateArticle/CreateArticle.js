import React from 'react';

import ArticleForm from '../ArticleForm/ArticleForm.js';

const CreateArticle = () => {
  const token = localStorage.getItem('token');
  const sendArticle = async (data) => {
    const response = await fetch('https://blog-platform.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  };
  return <ArticleForm sendArticle={sendArticle} />;
};

export default CreateArticle;
