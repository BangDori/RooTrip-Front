import React from 'react';

const Article = ({ closeArticle, data }) => {
  return (
    <div className='articleContent'>
      <header>
        <div className='articleTitle'>
          <h1>{data.title}</h1>
        </div>
        <button type='button' onClick={closeArticle}>
          x
        </button>
        <div className={`'articleImg' ${data.firstimage ? '' : 'articleImg2'}`}>
          <img src={data.firstimage} alt='사진 없음'></img>
        </div>
      </header>
      <main>
        <div className='contentTable'>
          <div className='articleAddr1'>
            <div className='contentName'>
              <span>주소 : {data.addr1}</span>
            </div>
          </div>
          <div className='articleAddr2'>
            <div className='contentName'>
              <span>상세 주소 : {data.addr2 ? data.addr2 : '없음'}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Article;
