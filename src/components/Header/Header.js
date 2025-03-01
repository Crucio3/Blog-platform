import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getData, clearData } from '../../store/slices/UserDataSlices.js';

import classes from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const actualData = useSelector((state) => state.data.data);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const content =
    localStorage.getItem('user') !== null ? (
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

  return (
    <header className={classes['blog-header']}>
      <Link to="/" className={classes['blog-header__toList']}>
        Realworld Blog
      </Link>
      {content}
    </header>
  );
};

export default Header;
