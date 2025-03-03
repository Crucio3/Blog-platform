import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getUser } from '../../store/slices/UserDataSlices.js';

import classes from './SignIn.module.scss';

const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (body) => {
    try {
      const response = await fetch('https://blog-platform.kata.academy/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      localStorage.setItem('token', data.user.token);
      dispatch(getUser());
      navigate('/');
      reset();
    } catch {
      alert('Неправильный логин или пароль');
      reset();
    }
  };

  const onSubmit = (data) => {
    const body = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    login(body);
    return body;
  };

  return (
    <div className={classes['sign-in']}>
      <h2 className={classes['sign-in__title']}>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={classes['sign-in__label']}>
          Email address
          <input
            className={`${classes['sign-in__input']} ${errors?.email?.message && classes['sign-in__input_error']}`}
            {...register('email', {
              required: 'Поле обязательно к заполнению',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Некорректный email адрес',
              },
            })}
            placeholder="Email address"
          />
          <div className={`${errors?.email?.message && classes['sign-in__input_error']}`}>
            {errors?.email && <p>{errors.email.message}</p>}
          </div>
        </label>
        <label className={classes['sign-in__label']}>
          Password
          <input
            className={`${classes['sign-in__input']} ${errors?.password?.message && classes['sign-in__input_error']}`}
            {...register('password', {
              required: 'Поле обязательно к заполнению',
            })}
            placeholder="Password"
          />
          <div className={`${errors?.password?.message && classes['sign-in__input_error']}`}>
            {errors?.password && <p>{errors.password.message}</p>}
          </div>
        </label>
        <input type="submit" value="Login" className={classes['sign-in__create']} />
      </form>
      <div className={classes['sign-in__sign-up']}>
        Don’t have an account? <Link to="/sign-in">Sign Up</Link>.
      </div>
    </div>
  );
};

export default SignIn;
