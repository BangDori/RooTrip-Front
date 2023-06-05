import { useCallback, useState } from 'react';

const VisibleModes = [
  {
    id: 1,
    label: '전체공개',
  },
  {
    id: 2,
    label: '친구공개',
  },
  {
    id: 3,
    label: '나만보기',
  },
];

const WriteContent = ({ onMovePage, onUploadWrite }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMode, setSelectedMode] = useState(VisibleModes[0].label);

  const onChangeTitleHandler = useCallback((e) => setTitle(e.target.value), []);
  const onChangeContentHandler = useCallback(
    (e) => setContent(e.target.value),
    [],
  );

  const handleClick = useCallback((mode) => {
    setSelectedMode(mode);
  }, []);

  const onClickSubmitPostHandler = useCallback(() => {
    onUploadWrite({ title, content, selectedMode });
  }, [title, content, selectedMode, onUploadWrite]);

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
        <button
          type='button'
          className='MoveModal'
          onClick={onClickSubmitPostHandler}
        >
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
              value={title}
              onChange={onChangeTitleHandler}
            />
          </div>
          <div className='Write_Main_content'>
            <textarea
              name='content'
              placeholder='내용을 입력해주세요'
              value={content}
              onChange={onChangeContentHandler}
            />
          </div>
        </div>
      </div>
      <div className='footer'>
        <div className='Show_who_btns'>
          {VisibleModes.map((VisibleMode) => (
            <button
              key={VisibleMode.id}
              onClick={() => handleClick(VisibleMode.label)}
              className={selectedMode === VisibleMode.label ? 'choose_btn' : ''}
            >
              {VisibleMode.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WriteContent;
