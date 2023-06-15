import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LikeImage from '@assets/route/like.png';
import CommentImage from '@assets/route/comment.png';
import { getOnePost } from '@services/post';
import { load, insert, remove } from '@store/marker';
import { loadArticle } from '@store/article';
import { setChangeCoordinate } from '@store/map';
import { changeCityToCoordinate } from '@utils/metadata';

const SearchItem = ({ item, onSetPrevMarkers }) => {
  const { accessToken } = useSelector((state) => state.accessToken);
  const marker = useSelector((state) => state.marker.marker);
  const dispatch = useDispatch();

  const { id, imageUrl, post, coordinate, commentCount } = item;
  const { id: postId, title, createdAt, like, routes } = post;

  useEffect(() => {
    dispatch(insert({ id, postId, imageUrl, coordinate }));

    return () => {
      dispatch(remove({ postId }));
    };
  }, [dispatch, id, postId, imageUrl, coordinate]);

  const onClickPostHandler = useCallback(async () => {
    try {
      const { photos } = await getOnePost(accessToken, postId);

      dispatch(loadArticle({ postId }));
      const data = photos.map((photo) =>
        routes.includes(String(photo.order + 1))
          ? {
              id: photo.id,
              imageUrl: photo.imageUrl,
              coordinate: photo.coordinate,
              order: routes.indexOf(String(photo.order + 1)) + 1,
            }
          : null,
      );
      dispatch(load({ data }));

      const movedPoint = photos.map((photo) => {
        if (!photo.coordinate || !routes.includes(String(photo.order + 1)))
          return null;

        const coordinateString = photo.coordinate
          .replace('POINT(', '')
          .replace(')', '');

        const [lng, lat] = coordinateString.split(' ');

        return {
          id: photo.id,
          name: photo.city,
          coordinate: [Number(lat), Number(lng)],
        };
      });
      const map = changeCityToCoordinate(movedPoint);
      dispatch(setChangeCoordinate({ map }));

      onSetPrevMarkers(marker);
    } catch (e) {
      alert(e.message);
    }
  }, [dispatch, onSetPrevMarkers, postId, marker, accessToken, routes]);

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
