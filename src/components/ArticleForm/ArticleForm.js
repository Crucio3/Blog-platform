import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import classes from './ArticleForm.module.scss';

const ArticleForm = ({
  sendArticle = () => {},
  updateArticle = () => {},
  slug = '',
  title = '',
  description = '',
  body = '',
  tagList = [],
}) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: { tags: tagList },
  });

  const navigate = useNavigate();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const tagInputs = fields.map((field, index) => (
    <div key={field.id} style={{ display: 'flex' }}>
      <div style={{ display: 'block' }}>
        <input
          className={`${classes['article-form__input']} ${errors?.tags?.[index]?.value?.message && classes['article-form__input_error']} ${classes['article-form__tag']}`}
          {...register(`tags.${index}.value`, { required: 'Поле обязательно к заполнению' })}
          placeholder="Tag"
          defaultValue={slug === undefined ? null : tagList[index]}
        />
        <div className={classes['article-form_error']}>
          {errors?.tags?.[index]?.value && <p>{errors.tags[index].value.message}</p>}
        </div>
      </div>
      <button className={classes['article-form__deleteTag']} onClick={() => remove(index)} type="button">
        Delete
      </button>
    </div>
  ));

  const onSubmit = (data) => {
    const tags = data.tags.map((item) => item.value);
    const article = { article: { title: data.title, description: data.description, body: data.text, tagList: tags } };

    if (slug === '') {
      sendArticle(article);
    } else {
      updateArticle(article);
    }
    navigate('/');
    reset();
  };

  return (
    <div className={classes['article-form']}>
      <h2 className={classes['article-form__title']}>{slug === '' ? 'Create new article' : 'Edit article'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={classes['article-form__label']}>
          Title
          <input
            className={`${classes['article-form__input']} ${errors?.title?.message && classes['article-form__input_error']}`}
            {...register('title', { required: 'Поле обязательно к заполнению' })}
            placeholder="Title"
            defaultValue={title}
          />
          <div className={classes['article-form_error']}>{errors?.title && <p>{errors.title.message}</p>}</div>
        </label>
        <label className={classes['article-form__label']}>
          Short description
          <input
            className={`${classes['article-form__input']} ${errors?.description?.message && classes['article-form__input_error']}`}
            {...register('description', { required: 'Поле обязательно к заполнению' })}
            placeholder="Short description"
            defaultValue={description}
          />
          <div className={classes['article-form_error']}>
            {errors?.description && <p>{errors.description.message}</p>}
          </div>
        </label>
        <label className={classes['article-form__label']}>
          Text
          <textarea
            className={`${classes['article-form__input']} ${errors?.text?.message && classes['article-form__input_error']} ${classes['article-form__text']}`}
            {...register('text', { required: 'Поле обязательно к заполнению' })}
            placeholder="Text"
            defaultValue={body}
          />
          <div className={classes['article-form_error']}>{errors?.text && <p>{errors.text.message}</p>}</div>
        </label>
        <label className={classes['article-form__label']}>
          Tags
          {tagInputs}
        </label>
        <input
          type="button"
          value="Add tag"
          className={classes['article-form__add-tag']}
          onClick={() => append({ value: '' })}
        />
        <input type="submit" value="Send" className={classes['article-form__send']} />
      </form>
    </div>
  );
};

export default ArticleForm;
