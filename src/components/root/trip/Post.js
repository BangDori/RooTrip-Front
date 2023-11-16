import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
  faBookmark,
  faCompass,
  faHeart,
} from '@fortawesome/free-regular-svg-icons';

import { routeMarkers, returnMarkers } from '@store/marker';
import { formatDate, formatNumber } from '@utils/format';
import '@styles/root/post/Post.scss';
import '@styles/root/trip/Trip.scss';

import ImageSlider from './ImageSlider';

const Post = ({ data }) => {
  const [curPage, setCurPage] = useState(1);

  const dispatch = useDispatch();

  const { postViews, post } = data;
  const { article, like, photos, routes, user, updatedAt } = post;
  const { id: userId, name, profile } = user;
  const totPage = photos.length;

  const { type } = useSelector((state) => state.marker);

  const formattedArticle = article
    .split('\\r\\n')
    .map((line, index) => {
      if (line === '') return null;

      return (
        <p key={index}>
          {line}
          <br />
        </p>
      );
    })
    .filter(Boolean);

  const routeOnMap = () => {
    if (type === 'ROUTE') {
      dispatch(returnMarkers());
      return;
    }

    dispatch(routeMarkers({ photos, routes }));
  };

  return (
    <div className='post-wrapper'>
      <div className='cancel-btn-container'>
        <Link to='/trip' className='cancle-btn'>
          {<FontAwesomeIcon icon={faXmark} size='lg' />}
        </Link>
      </div>
      <div className='post-page'>
        {curPage} / {totPage}
      </div>
      <div className='post-main'>
        <div className='post-profile'>
          {profile ? (
            <img src={profile} alt='user-image-profile' />
          ) : (
            <FontAwesomeIcon icon={faCircleUser} className='fa-circle-user' />
          )}
          <p className='profile-name'>
            <Link to={`/profile/${userId}`}>{name}</Link>
          </p>
        </div>
        <ImageSlider
          photos={photos}
          curPage={curPage}
          totPage={totPage}
          setCurPage={setCurPage}
        />
      </div>
      <div className='post-article'>
        <div className='post-top'>
          <div className='post-icons'>
            <div className='left-icons'>
              <FontAwesomeIcon icon={faHeart} />
              <FontAwesomeIcon
                icon={faCompass}
                onClick={routeOnMap}
                color={type === 'ROUTE' ? '#0095f6' : '#000'}
              />
            </div>
            <div className='right-icon'>
              <FontAwesomeIcon icon={faBookmark} />
            </div>
          </div>
          <div className='post-info'>
            <span>{formatDate(updatedAt)}</span>
            <span>좋아요 {formatNumber(like)}</span>
            <span>조회수 {formatNumber(postViews)}</span>
          </div>
        </div>

        <section className='post-section'>{formattedArticle}</section>
      </div>
    </div>
  );
};

export default Post;
