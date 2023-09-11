import { useEffect, useState } from 'react';
import { useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons';

import PhotoSlider from '@components/common/PhotoSlider';
import PreviewFile from './preview/PreviewFile';

const PostCreation = ({ onPrev, files, onUpload, onRemove, notify }) => {
  const [cur, setCur] = useState(0);
  const { register, handleSubmit } = useForm();
  const submit = useSubmit();

  useEffect(() => {
    if (files.length <= 3) setCur(0);
  }, [files.length]);

  let notRegisterCount = 0;
  const renderFiles = files.map((file) => {
    if (!file.dateTime) notRegisterCount += 1;

    return <PreviewFile key={file.fileName} file={file} onRemove={onRemove} />;
  });

  const onCreatePost = (postForm) => {
    if (notRegisterCount === files.length) {
      notify('이미지를 클릭해 지도에 등록해주세요.', 'error');
      return;
    }

    submit(postForm, { method: 'post' });
  };

  return (
    <form method='post' onSubmit={handleSubmit(onCreatePost)}>
      <input type='hidden' name='files' value={JSON.stringify(files)} />
      <nav className='post-nav'>
        <button type='button' className='move-button' onClick={onPrev}>
          이전
        </button>
        <button type='submit' className='move-button'>
          공유
        </button>
      </nav>

      <div className='post-section'>
        {cur > 0 && (
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            className='direction left-direction'
            onClick={() => setCur((prev) => prev - 1)}
          />
        )}
        {cur + 3 <= files.length && (
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            className='direction right-direction'
            onClick={() => setCur((prev) => prev + 1)}
          />
        )}
        <div className='upload-image-section'>
          <PhotoSlider
            files={renderFiles}
            onUpload={onUpload}
            notify={notify}
            left={files.length >= 3 ? cur * 146 : 0}
          />
        </div>

        <div className='post-article-section'>
          <textarea
            className='post-article'
            placeholder='게시글의 내용을 입력해주세요.'
            {...register('article', {
              required: true,
            })}
          />
        </div>

        {notRegisterCount === 0 && (
          <p className='register'>지도에 모든 사진이 등록되었습니다!</p>
        )}
        {notRegisterCount !== 0 && (
          <p className='not-register'>
            지도에 등록되지 않은 {notRegisterCount}개의 이미지가 있습니다.
          </p>
        )}
      </div>
    </form>
  );
};

export default PostCreation;