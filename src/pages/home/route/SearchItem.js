import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { insert, remove } from '@store/marker';
import LikeImage from '@assets/route-like.png';
import CommentImage from '@assets/route-comment.png';

const SearchItem = ({ item }) => {
  const { id, imageUrl, post, coordinate, commentCount } = item;
  const { id: postId, title, createdAt, like, routes } = post;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(insert({ id, postId, imageUrl, coordinate }));

    return () => {
      dispatch(remove({ postId }));
    };
  }, [dispatch, id, postId, imageUrl, coordinate]);

  const onClickPostHandler = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log(item);
    // eslint-disable-next-line no-console
    console.log(routes);
  }, [item, routes]);

  return (
    <div className='search-item'>
      <div className='item-image'>
        <button onClick={onClickPostHandler}>
          <img src={imageUrl} alt='thumbnail image' />
        </button>
      </div>
      <div className='item-content'>
        <div className='item-title' onClick={onClickPostHandler}>
          <h3>{title}</h3>
        </div>
        <div className='item-date'>
          <p>{createdAt}</p>
        </div>
        <div className='item-count-box'>
          <div className='item-like-count'>
            <img src={LikeImage} alt='like image' style={{ width: '36px' }} />
            <span>{like}</span>
          </div>
          <div className='item-comment-count'>
            <img
              src={CommentImage}
              alt='comment image'
              style={{ width: '32px' }}
            />
            <span>{commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
