import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Popconfirm } from 'antd';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from './ArticleCard.module.scss';

const ArticleCard = ({ article, isChild }) => {
  const date = new Date(article.createdAt);
  const formattedDate = format(date, 'MMMM d, yyyy');

  const { username, image } = article.author;
  const { slug } = article;
  const token = localStorage.getItem('token');
  const nowUser = useSelector((state) => state.data.data.username);

  const navigate = useNavigate();

  const [like, setLike] = useState(article.favorited);
  const [numberLikes, setNumberLikes] = useState(article.favoritesCount);

  const tags = article.tagList.map((item) => {
    return (
      <Tag key={nanoid()} className={classes['card__tag']}>
        {item}
      </Tag>
    );
  });

  const favorite = async () => {
    fetch(`https://blog-platform.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNumberLikes((state) => state + 1);
  };

  const unfavorite = async () => {
    fetch(`https://blog-platform.kata.academy/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNumberLikes((state) => state - 1);
  };

  const title = isChild ? (
    <div className={classes['card__title']}>{article.title}</div>
  ) : (
    <Link className={classes['card__title']} to={`/articles/${article.slug}`}>
      {article.title}
    </Link>
  );

  const deleteArticle = async (slug) => {
    fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const buttons =
    username === nowUser && isChild ? (
      <div>
        <Popconfirm
          placement="rightTop"
          title="Delete the task"
          description="Are you sure to delete this article?"
          onConfirm={() => {
            deleteArticle(slug);
            navigate('/');
          }}
          okText="Yes"
          cancelText="No"
        >
          <button className={classes['card__delete']}>Delete</button>
        </Popconfirm>
        <button
          className={classes['card__edit']}
          onClick={() => {
            navigate(`/articles/${slug}/edit`);
          }}
        >
          Edit
        </button>
      </div>
    ) : null;

  const disabled = token === null ? true : false;

  return (
    <div className={`${classes.card} ${isChild ? classes['card_child'] : ''}`}>
      <div className={classes['card__content']}>
        <div
          style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}
          className={classes['card__wrapper']}
        >
          {title}
          <span className={classes['card__wrapper']} style={{ display: 'flex', alignItems: 'center' }}>
            <label className={classes.check}>
              <input
                type="checkbox"
                className={classes['check__input']}
                name="custom"
                checked={like}
                onChange={(e) => {
                  if (e.target.checked) {
                    setLike(true);
                    favorite();
                  } else {
                    setLike(false);
                    unfavorite();
                  }
                }}
                disabled={disabled}
              ></input>
              <span className={classes['check__box']}></span>
            </label>
            {numberLikes}
          </span>
        </div>
        {tags}
        <p className={classes['card__description']}>{article.description}</p>
      </div>
      <div>
        <div className={classes['card__inform']}>
          <div className={classes['card__author']}>
            <h2 className={classes['card__username']}>{username}</h2>
            <p className={classes['card__date']}>{formattedDate}</p>
          </div>
          <div className={classes['card__image-wrapper']}>
            <img className={classes['card__image']} src={image} alt="" />
          </div>
        </div>
        {buttons}
      </div>
    </div>
  );
};

export default ArticleCard;
