import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post';

const Trip = () => {
  const { accessToken } = useSelector((state) => state.accessToken);

  const { postId } = useSelector((state) => state.article);

  if (!postId) {
    return null;
  }

  return <Post postId={postId} accessToken={accessToken} />;
};

export default Trip;
