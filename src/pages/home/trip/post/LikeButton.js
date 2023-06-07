import React, { useCallback, useState } from 'react';
import { likePost, unLikePost } from '@services/post';

import Like from '@assets/Like.png';
import NotLike from '@assets/NotLike.png';

const LikeButton = ({ accessToken, postId, isLikedPost, setIsLikedPost }) => {
  const onClickLikeHandler = useCallback(async () => {
    try {
      await likePost(accessToken, postId);
      setIsLikedPost(true);
    } catch (e) {
      alert(e.message);
    }
  }, [accessToken, postId, setIsLikedPost]);

  const onClickUnlikeHandler = useCallback(async () => {
    try {
      await unLikePost(accessToken, postId);
      setIsLikedPost(false);
    } catch (e) {
      alert(e.message);
    }
  }, [accessToken, postId, setIsLikedPost]);

  return (
    <button
      type='button'
      onClick={isLikedPost ? onClickUnlikeHandler : onClickLikeHandler}
    >
      <img src={isLikedPost ? Like : NotLike} alt='LIKE_IMAGE' />
    </button>
  );
};

export default LikeButton;
