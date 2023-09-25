import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleUser,
  faCircleArrowLeft,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  faBookmark,
  faComment,
  faCompass,
  faHeart,
} from '@fortawesome/free-regular-svg-icons';

import '@styles/root/post/Post.scss';
import '@styles/root/trip/Trip.scss';
import { formatNumber } from '@utils/format';

import Comment from './Comment';

const totPage = 2;

const date = 3;
const like = 1005120;
const views = 1540;

const Post = () => {
  const [curPage, setCurPage] = useState(1);

  return (
    <div className='post-wrapper'>
      <div className='post-page'>
        {curPage} / {totPage}
      </div>
      <div className='post-main'>
        <div className='post-profile'>
          <FontAwesomeIcon icon={faCircleUser} className='fa-circle-user' />
          <p className='profile-name'>
            <Link to='/profile'>유저</Link>
          </p>
        </div>
        <div className='image-slide'>
          {curPage > 1 && (
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className='fa-left direction'
              onClick={() => setCurPage((prevPage) => prevPage - 1)}
            />
          )}
          {curPage < totPage && (
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className='fa-right direction'
              onClick={() => setCurPage((prevPage) => prevPage + 1)}
            />
          )}
        </div>
      </div>
      <div className='post-article'>
        <div className='post-top'>
          <div className='post-icons'>
            <div className='left-icons'>
              <FontAwesomeIcon icon={faHeart} />
              <FontAwesomeIcon icon={faComment} />
              <FontAwesomeIcon icon={faCompass} />
            </div>
            <div className='right-icon'>
              <FontAwesomeIcon icon={faBookmark} />
            </div>
          </div>
          <div className='post-info'>
            <span>{date}일 전</span>
            <span>좋아요 {formatNumber(like)}</span>
            <span>조회수 {formatNumber(views)}</span>
          </div>
        </div>

        <section className='post-section'>Text</section>

        <Comment />
      </div>
    </div>
  );
};

export default Post;
