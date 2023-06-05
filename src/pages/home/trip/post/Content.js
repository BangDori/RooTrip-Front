import React, { useCallback, useEffect, useState } from 'react';
import { getComments } from '@services/post';

import Profile from '@assets/DefaultProfileImage.png';
import Like from '@assets/Like.png';
import NotLike from '@assets/NotLike.png';
import Photos from './Photos';
import Comment from './Comment';

const Content = ({ accessToken, postId, post, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);

  const { user, photos, title, content } = post;
  const { profileImage, name } = user;

  useEffect(() => {
    const loadComments = async () => {
      try {
        setIsLoading(true);
        const comment = await getComments(accessToken, postId);

        setComments(comment);
        setIsLoading(false);
      } catch (e) {
        alert(e);
      }
    };

    loadComments();
  }, [accessToken, postId]);

  const onChangePhoto = useCallback((move) => {
    setCurrentPhoto((prevPhoto) => prevPhoto + move);
  }, []);

  const onAddCommentHandler = useCallback(() => {
    setCommentsCount((prevState) => prevState + 1);
  }, []);

  if (isLoading) return null;

  // eslint-disable-next-line no-console
  console.log(comments);

  return (
    <div className='modal-post'>
      <div className='modal-left'>
        <div className='modal-photos'>
          <Photos
            photos={photos}
            current={currentPhoto}
            onChangePhoto={onChangePhoto}
          />
          {/* {photos.map((photo) => (
            <div key={photo.id} className='modal-photo'>
              <img
                src={photo.imageUrl}
                alt={photo.city + photo.first + photo.second}
              />
            </div>
          ))} */}
        </div>
      </div>
      <div className='modal-right'>
        <div className='modal-user'>
          <img src={profileImage || Profile} alt='profile image' />
          <h5 className='profile_name'>{name}</h5>
        </div>

        <div className='modal-main-content'>
          <div className='modal-article'>
            <h3 className='modal-title'>{title}</h3>
            <p className='modal-content'>{content}</p>
          </div>
          <div className='modal-comments'>
            <div className='modal-comments-tot-count-box'>
              좋아요 {comments.length}개
            </div>
            {comments.map((comment) => (
              <div key={comment.id} className='modal-comment'>
                <div className='modal-comment-user'>
                  <img src={profileImage || Profile} alt='profile image' />
                  <h5 className='profile_name'>{name}</h5>
                  <span className='modal-comment-createAt'>
                    {comment.createdAt}
                  </span>
                </div>
                <div className='modal-comment-box'>
                  <p className='modal-comment-content'>{comment.comment}</p>
                </div>
                <div className='modal-comment-like'>
                  <img src={NotLike} alt='like button' />
                  <span className='modal-comment-like-count'>
                    {comment.like}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Comment
            accessToken={accessToken}
            postId={postId}
            onAddComment={onAddCommentHandler}
          />
        </div>
      </div>

      <button className='modal-post-close-button' onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default Content;
