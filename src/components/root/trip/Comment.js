import { formatNumber } from '@utils/format';

const commentCount = 16663;

const Comment = () => {
  return (
    <div className='post-comment'>
      <button className='comment-button'>
        댓글 {formatNumber(commentCount)}개 더보기
      </button>
      <form className='comment-form' action=''>
        <input type='text' placeholder='댓글을 입력하세요...' />
      </form>
    </div>
  );
};

export default Comment;
