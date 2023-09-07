import Post from '@components/root/trip/Post';

const TripPostPage = () => {
  return <Post />;
};

export default TripPostPage;

export async function loader({ params }) {
  const { postId } = params;

  // PostId에 대한 post 받아오기
  // eslint-disable-next-line no-console
  console.log(postId);

  return null;
}
