import { json, redirect, useNavigation } from 'react-router-dom';

import Write from '@components/root/write/Write';
import { createPost } from '@services/post';

const WritePage = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return <Write isSubmitting={isSubmitting} />;
};

export default WritePage;

export async function action({ request }) {
  const data = await request.formData();
  const files = JSON.parse(data.get('files'));

  const routes = files
    .map((file, idx) =>
      file.type.includes('image/') && file.dateTime ? idx : null,
    )
    .filter((idx) => idx !== null);

  const postForm = {
    files,
    artilce: data.get('article'),
    routes,
  };

  // 게시글 작성 API 연동
  const response = await createPost(postForm);
  const resData = await response.json();

  // 사용한 파일들의 blob url 제거
  files.forEach((file) => {
    window.URL.revokeObjectURL(file.url);
  });

  // 로그인 오류
  if (!resData.status) {
    throw json({ message: resData.message, link: '/trip' }, { status: 400 });
  }

  return redirect('/write/completion');
}
