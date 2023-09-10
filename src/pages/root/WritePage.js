import { redirect } from 'react-router-dom';

import Write from '@components/root/write/Write';

const WritePage = () => {
  return <Write />;
};

export default WritePage;

export async function action({ request }) {
  const data = await request.formData();
  const files = JSON.parse(data.get('files'));

  const routes = files.map((file, idx) =>
    file.type.includes('image/') && file.dateTime ? idx : null,
  );

  const postForm = {
    files,
    artilce: data.get('article'),
    routes,
  };

  // 게시글 작성 API 연동
  // eslint-disable-next-line no-console
  console.log(postForm);

  return redirect('/write/completion');
}
