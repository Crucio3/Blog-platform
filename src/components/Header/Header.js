import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { clearData } from '../../store/slices/UserDataSlices.js';
import { fetchArticlesLogout } from '../../store/slices/GetArticlesSlices.js';

import classes from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const actualData = useSelector((state) => state.data.data);
  const loading = useSelector((state) => state.data.loading);

  const content =
    localStorage.getItem('token') !== null ? (
      <div className={classes['blog-header__authentication']}>
        <Link to="new-article" className={classes['blog-header__create-article']}>
          Create article
        </Link>
        <Link to="/profile" className={classes['blog-header__user']}>
          {actualData.username}
          <div className={classes['blog-header__img-wrapper']}>
            <img className={classes['blog-header__img']} src={actualData.image} alt="" />
          </div>
        </Link>
        <button
          className={classes['blog-header__log-out']}
          onClick={() => {
            localStorage.clear();
            dispatch(clearData());
            dispatch(fetchArticlesLogout());
          }}
        >
          Log Out
        </button>
      </div>
    ) : (
      <div className={classes['blog-header__authentication']}>
        <Link to="/sign-in" className={classes['blog-header__sign-in']}>
          Sign In
        </Link>
        <Link to="/sign-up" className={classes['blog-header__sign-up']}>
          Sign Up
        </Link>
      </div>
    );

  const user = loading ? null : content;

  return (
    <header className={classes['blog-header']}>
      <Link to="/" className={classes['blog-header__toList']}>
        Realworld Blog
      </Link>
      {user}
    </header>
  );
};

export default Header;
