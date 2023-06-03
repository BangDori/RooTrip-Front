import React from 'react';
import Profile from '@assets/DefaultProfileImage.png';

const Content = ({ post, onClose }) => {
  const { user, photos, title, content, comments } = post;
  const { profileImage, name } = user;

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
