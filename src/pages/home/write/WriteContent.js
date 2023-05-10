import { useCallback, useState } from 'react';

const WriteContent = ({ onMovePage, onUploadWrite }) => {
  const [article, setArticle] = useState({
    title: '',
    content: '',
  });
  const [show, setShow] = useState(0);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  }, []);

  const handleClick = useCallback((e) => {
    setShow(Number(e.target.name));
  }, []);

  const onFinish = useCallback(() => {
    onUploadWrite(article);
  }, [article, onUploadWrite]);

  return (
    <div className='Last_modal'>
      <div className='Modal_head'>
        <button
          type='button'
          className='MoveModal Ch'
          onClick={() => onMovePage(-1)}
        >
          이전
        </button>
        <span>새 게시글 작성하기</span>
        <button type='button' className='MoveModal' onClick={onFinish}>
          완료
        </button>
      </div>
      <div className='Modal_content'>
        <div className='Write_content'>
          <div className='Write_Title'>
            <input
              type='text'
              name='title'
              placeholder='제목을 입력해주세요'
              onChange={onChange}
            />
          </div>
          <div className='Write_Main_content'>
            <textarea
              name='content'
              placeholder='내용을 입력해주세요'
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      <div className='footer'>
        <div className='With_who'>
          <span>With</span>
          <input type='text' />
        </div>
        <div className='Show_who_btns'>
          <button
            name='0'
            onClick={handleClick}
            className={show === 0 ? 'choose_btn' : ''}
          >
            공개
          </button>
          <button
            name='1'
            onClick={handleClick}
            className={show === 1 ? 'choose_btn' : ''}
          >
            비공개
          </button>
          <button
            name='2'
            onClick={handleClick}
            className={show === 2 ? 'choose_btn' : ''}
          >
            나만보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteContent;
