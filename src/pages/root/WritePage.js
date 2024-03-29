import { json, useNavigation } from 'react-router-dom';

import Write from '@components/root/write/Write';
import { getPreSignedUrl, uploadFileToS3 } from '@services/media';
import { createPost } from '@services/post';
import { regLineBreak } from '@constants/regular-expression';
import store from '@store/configureStore';

const WritePage = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return <Write isSubmitting={isSubmitting} />;
};

export default WritePage;

export async function action({ request }) {
  const data = await request.formData();
  const { markers: files } = store.getState().marker;

  const routes = files
    .map((file, idx) =>
      file.type.includes('image/') && typeof file.coordinate === 'object'
        ? idx
        : null,
    )
    .filter((idx) => idx !== null);

  const fileNames = files.map((file) => file.fileName);
  const urlResponse = await getPreSignedUrl(fileNames);
  const urlResData = await urlResponse.json();
  const { data: urls } = urlResData;

  // pre-signed url에 사진 파일 전송하기
  const newFiles = await Promise.all(
    files.map(async (file, index) => {
      const fileUrl = await fetch(file.url);
      const blob = await fileUrl.blob();
      const newFile = new File(
        [blob],
        `${Date.now()}-${file.fileName}.${file.type}`,
        {
          type: file.type,
        },
      );

      await uploadFileToS3(urls[index], newFile);

      window.URL.revokeObjectURL(file.url);
      return {
        type: file.type,
        fileName: file.fileName,
        coordinate: file.coordinate,
      };
    }),
  );

  const article = data.get('article').replace(regLineBreak, '\\r\\n');

  const postForm = {
    newPhotos: newFiles,
    article,
    routes,
  };

  // 게시글 작성 API 연동
  const response = await createPost(postForm);
  const resData = await response.json();

  // 로그인 오류
  if (!response.status) {
    throw json({ message: resData.message, link: '/trip' }, { status: 400 });
  }

  return null;
}
