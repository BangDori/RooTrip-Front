import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { load } from '@store/marker';
import { getPosts } from '@services/post';
import Post from './Post';

const Trip = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useSelector((state) => state.accessToken);
  const { markers } = useSelector((state) => state.marker);
  const dispatch = useDispatch();

  useEffect(() => {
    if (markers.length > 0) return;

    const posts = async () => {
      try {
        setIsLoading(true);
        const data = await getPosts(accessToken);
        dispatch(load({ data }));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }

      setIsLoading(false);
    };

    posts();
  }, [accessToken, markers, dispatch]);

  const { id } = useSelector((state) => state.article);

  if (isLoading || !id) {
    return null;
  }

  return <Post id={id} accessToken={accessToken} />;
};

export default Trip;
