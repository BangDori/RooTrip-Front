import React, { useCallback } from 'react';
import { likePost } from '@services/post';

import LIKE_IMAGE from '@assets/like_image.png';

const LikeButton = ({ accessToken, postId }) => {
  const onClickLikeHandler = useCallback(async () => {
    try {
      await likePost(accessToken, postId);
    } catch (e) {
      alert(e.message);
    }
  }, [accessToken, postId]);

  return (
    <button type='button' onClick={onClickLikeHandler}>
      <img src={LIKE_IMAGE} alt='LIKE_IMAGE' />
    </button>
  );
};

export default LikeButton;
