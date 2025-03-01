import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import classes from './SignUp.module.scss';

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const navigate = useNavigate();

  const registration = async (body) => {
    const response = await fetch('https://blog-platform.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  };

  const onSubmit = (data) => {
    const body = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };
    registration(body);
    navigate('/sign-in');
    reset();
    return body;
  };

  const password = watch('password');
  return (
    <div className={classes['sign-up']}>
      <h2 className={classes['sign-up__title']}>Create new account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={classes['sign-up__label']}>
          Username
          <input
            className={`${classes['sign-up__input']} ${errors?.username?.message && classes['sign-up__input_error']}`}
            {...register('username', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 3,
                message: 'Длина меньше трёх символов',
              },
              maxLength: {
                value: 20,
                message: 'Длина больше двадцати символов',
              },
            })}
            placeholder="Username"
          />
          <div className={`${errors?.username?.message && classes['sign-up__input_error']}`}>
            {errors?.username && <p>{errors.username.message}</p>}
          </div>
        </label>
        <label className={classes['sign-up__label']}>
          Email address
          <input
            className={`${classes['sign-up__input']} ${errors?.email?.message && classes['sign-up__input_error']}`}
            {...register('email', {
              required: 'Поле обязательно к заполнению',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Некорректный email адрес',
              },
            })}
            placeholder="Email address"
          />
          <div className={`${errors?.email?.message && classes['sign-up__input_error']}`}>
            {errors?.email && <p>{errors.email.message}</p>}
          </div>
        </label>
        <label className={classes['sign-up__label']}>
          Password
          <input
            className={`${classes['sign-up__input']} ${errors?.password?.message && classes['sign-up__input_error']}`}
            {...register('password', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 6,
                message: 'Длина меньше шести символов',
              },
              maxLength: {
                value: 40,
                message: 'Длина больше сорока символов',
              },
            })}
            placeholder="Password"
          />
          <div className={`${errors?.password?.message && classes['sign-up__input_error']}`}>
            {errors?.password && <p>{errors.password.message}</p>}
          </div>
        </label>
        <label className={classes['sign-up__label']}>
          Repeat password
          <input
            className={`${classes['sign-up__input']} ${errors?.repeatPassword?.message && classes['sign-up__input_error']}`}
            {...register('repeatPassword', {
              required: 'Поле обязательно к заполнению',
              validate: (value) => value === password || 'Пароли не совпадают',
            })}
            placeholder="Repeat password"
          />
          <div className={`${errors?.repeatPassword?.message && classes['sign-up__input_error']}`}>
            {errors?.repeatPassword && <p>{errors.repeatPassword.message}</p>}
          </div>
        </label>
        <label className={`${classes['sign-up__label']} ${classes['sign-up__checkbox-wrapper']}`}>
          <input
            type="checkbox"
            className={classes['sign-up__checkbox']}
            {...register('agree', { required: 'Вы должны принять условия' })}
          />
          <p>I agree to the processing of my personal information</p>
        </label>
        <input type="submit" value="Create" className={classes['sign-up__create']} />
      </form>
      <div className={classes['sign-up__sign-in']}>
        Already have account? <Link to="/sign-in">Sign In</Link>.
      </div>
    </div>
  );
};

export default SignUp;
