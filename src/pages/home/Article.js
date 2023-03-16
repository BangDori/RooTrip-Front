import React from 'react';
import '@styles/home/article.scss';
import Profile from '@assets/태훈이 프사.jpg';
import Test_Photo from '@assets/힘찬이 먹방.jpg';

const Article = ({ modal, setModal }) => {
  return (
    <div>
      <article>
        <div className='Main_content'>
          <div className='article_head'>
            <span className='photo_page'>1 / 6</span>
          </div>
          <div className='Content'>
            <div className='Con_pro'></div>
            <div className='Photo'>
              <img src={Test_Photo} alt='사진' />
            </div>
          </div>
          <div className='addr'>
            <span>경상북도 경산시 대학로 280 or (영남대 정문)</span>
          </div>
          <div className='comment_section'>
            <div className='comment_container'>댓글</div>
            <div className='comment_box'>
              <img src={Profile} alt='프로필 사진' />
              <input
                className='comment_input'
                type='text'
                name='comment'
                value=''
                placeholder='댓글을 입력하세요.'
              ></input>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Article;
