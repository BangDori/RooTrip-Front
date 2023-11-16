import { Suspense } from 'react';
import { Await, defer, redirect, useLoaderData } from 'react-router-dom';

import Post from '@components/root/trip/Post';
import { MAIN_SERVER } from '@config/server-config';
import store from '@store/configureStore';

const TripPostPage = () => {
  const { data } = useLoaderData();

  return (
    <Suspense>
      <Await resolve={data}>
        {(resolvedData) => <Post data={resolvedData} />}
      </Await>
    </Suspense>
  );
};

export default TripPostPage;

export async function loader({ params }) {
  const { postId } = params;

  // PostId에 대한 post 받아오기
  const { accessToken } = store.getState().user;

  if (!accessToken) return null;

  const response = await fetch(`${MAIN_SERVER}/api/post/${postId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const resData = await response.json();

  if (!resData.status) {
    return redirect('/trip');
  }

  const { data } = resData;

  return defer({
    data,
  });
}
