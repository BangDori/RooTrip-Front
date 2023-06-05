import React, { useCallback, useEffect, useState } from 'react';
import { likePost, unLikePost } from '@services/post';

import Like from '@assets/Like.png';
import NotLike from '@assets/NotLike.png';

const LikeButton = ({ accessToken, postId, isLikedPost }) => {
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    setIsLike(isLikedPost);
  }, [isLikedPost]);

  const onClickLikeHandler = useCallback(async () => {
    try {
      await likePost(accessToken, postId);
      setIsLike(true);
    } catch (e) {
      alert(e.message);
    }
  }, [accessToken, postId]);

  const onClickUnlikeHandler = useCallback(async () => {
    try {
      await unLikePost(accessToken, postId);
      setIsLike(false);
    } catch (e) {
      alert(e.message);
    }
  }, [accessToken, postId]);

  return (
    <button
      type='button'
      onClick={isLike ? onClickUnlikeHandler : onClickLikeHandler}
    >
      <img src={isLike ? Like : NotLike} alt='LIKE_IMAGE' />
    </button>
  );
};

export default LikeButton;
