import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { load } from '@store/marker';
import { getPosts } from '@services/post';
import Post from './Post';

const Trip = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useSelector((state) => state.accessToken);
  const marker = useSelector((state) => state.marker);
  const dispatch = useDispatch();

  useEffect(() => {
    if (marker.length > 0) return;

    const posts = async () => {
      try {
        setIsLoading(true);
        const markers = await getPosts(accessToken);
        dispatch(load({ markers }));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }

      setIsLoading(false);
    };

    posts();
  }, [accessToken, marker, dispatch]);

  const { id } = useSelector((state) => state.article);

  if (isLoading || !id) {
    return null;
  }

  return <Post id={id} accessToken={accessToken} />;
};

export default Trip;
