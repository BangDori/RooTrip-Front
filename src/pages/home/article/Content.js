import React, { useEffect, useState } from 'react';
import { getComments } from '@services/post';
import Profile from '@assets/DefaultProfileImage.png';

const Content = ({ accessToken, postId, post, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
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

  if (isLoading) return null;

  return (
    <div className='modal-post'>
      <div className='modal-left'>
        <div className='modal-photos'>
          {photos.map((photo) => (
            <div key={photo.id} className='modal-photo'>
              <img
                src={photo.imageUrl}
                alt={photo.city + photo.first + photo.second}
              />
            </div>
          ))}
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
            {comments.map((comment) => (
              <div key={comment.id}>{comment.comment}</div>
            ))}
          </div>
        </div>
      </div>

      <button className='modal-post-close-button' onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default Content;
