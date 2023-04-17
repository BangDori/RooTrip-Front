import { useCallback, useState } from 'react';

const WriteContent = ({ onMovePage, onSetArticle }) => {
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

  const onFinish = useCallback(() => {
    onSetArticle(article);
    onMovePage(1);
  }, [article, onSetArticle, onMovePage]);

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
            onClick={() => setShow(0)}
            className={show === 0 && 'choose_btn'}
          >
            공개
          </button>
          <button
            onClick={() => setShow(1)}
            className={show === 1 && 'choose_btn'}
          >
            비공개
          </button>
          <button
            onClick={() => setShow(2)}
            className={show === 2 && 'choose_btn'}
          >
            나만보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteContent;
