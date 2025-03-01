import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getData } from '../../store/slices/UserDataSlices.js';

import classes from './Profile.module.scss';

const Profile = () => {
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

  const defaultData = useSelector((state) => state.data.data);

  const reduction = async (body) => {
    const response = await fetch('https://blog-platform.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${defaultData.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data.user));
    dispatch(getData());
    return data;
  };

  const onSubmit = (data) => {
    const body = {
      user: {
        image: data.image,
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };
    reduction(body);
    navigate('/');
    reset();
    return body;
  };

  return (
    <div className={classes['profile']}>
      <h2 className={classes['profile__title']}>Edit profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={classes['profile__label']}>
          Username
          <input
            className={`${classes['profile__input']} ${errors?.username?.message && classes['profile__input_error']}`}
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
            defaultValue={defaultData.username}
          />
          <div className={`${errors?.username?.message && classes['profile__input_error']}`}>
            {errors?.username && <p>{errors.username.message}</p>}
          </div>
        </label>
        <label className={classes['profile__label']}>
          Email address
          <input
            className={`${classes['profile__input']} ${errors?.email?.message && classes['profile__input_error']}`}
            {...register('email', {
              required: 'Поле обязательно к заполнению',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Некорректный email адрес',
              },
            })}
            placeholder="Email address"
            defaultValue={defaultData.email}
          />
          <div className={`${errors?.email?.message && classes['profile__input_error']}`}>
            {errors?.email && <p>{errors.email.message}</p>}
          </div>
        </label>
        <label className={classes['profile__label']}>
          Password
          <input
            className={`${classes['profile__input']} ${errors?.password?.message && classes['profile__input_error']}`}
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
          <div className={`${errors?.password?.message && classes['profile__input_error']}`}>
            {errors?.password && <p>{errors.password.message}</p>}
          </div>
        </label>
        <label className={classes['profile__label']}>
          Avatar image (url)
          <input
            className={`${classes['profile__input']} ${errors?.password?.message && classes['profile__input_error']}`}
            {...register('image', {
              required: 'Поле обязательно к заполнению',
              pattern: {
                value: /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w-.~:?#[\]@!$&'()*+,;=]*)?$/,
                message: 'Неккоректный url',
              },
            })}
            placeholder="Avatar image"
            defaultValue={defaultData.image}
          />
          <div className={`${errors?.image?.message && classes['profile__input_error']}`}>
            {errors?.image && <p>{errors.image.message}</p>}
          </div>
        </label>
        <input type="submit" value="Save" className={classes['profile__create']} />
      </form>
    </div>
  );
};

export default Profile;
