import { useState } from 'react';
import { useToggle } from '@uidotdev/usehooks';
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

import { formatNumber } from '@utils/format';
import '@styles/root/post/Post.scss';
import '@styles/root/trip/Trip.scss';

import Modal from '@components/common/Modal';
import Comment from './Comment';
import FullScreenPost from './FullScreenPost';

const totPage = 2;

const date = 3;

const Post = ({ data }) => {
  const [curPage, setCurPage] = useState(1);
  const [onFullScreen, toggleFullScreen] = useToggle(false);

  const { postViews, post } = data;
  const { article, comments, like, user } = post;

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

  const { name, profile } = user;

  return (
    <div className='post-wrapper'>
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
            <Link to='/profile'>{name}</Link>
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
              <FontAwesomeIcon icon={faComment} onClick={toggleFullScreen} />
              <FontAwesomeIcon icon={faCompass} />
            </div>
            <div className='right-icon'>
              <FontAwesomeIcon icon={faBookmark} />
            </div>
          </div>
          <div className='post-info'>
            <span>{date}일 전</span>
            <span>좋아요 {formatNumber(like)}</span>
            <span>조회수 {formatNumber(postViews)}</span>
          </div>
        </div>

        <section className='post-section'>
          {formattedArticle}
          <button className='more-post-btn' onClick={toggleFullScreen}>
            ... 더보기
          </button>
        </section>

        <Comment comments={comments} />

        {onFullScreen && (
          <Modal onClose={toggleFullScreen}>
            <FullScreenPost onClose={toggleFullScreen} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Post;
