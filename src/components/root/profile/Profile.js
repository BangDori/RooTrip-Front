import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlaneUp,
  faBookmark,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import test1 from '@assets/test/test1.jpg';
import test2 from '@assets/test/test2.jpg';
import test3 from '@assets/test/test3.jpg';
import test4 from '@assets/test/test4.jpg';
import test5 from '@assets/test/test5.jpg';
import test6 from '@assets/test/test6.jpg';
import '@styles/root/profile/My.scss';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('travel');
  const [articleTab, setArticleTab] = useState('post');

  const renderTravelPosts = () => {
    return (
      <div className='article-group'>
        <div className='article-image post1'>
          <img src={test1} alt='test1' />
        </div>
        <div className='article-image post2'>
          <img src={test2} alt='test1' />
        </div>
        <div className='article-image post3'>
          <img src={test3} alt='test1' />
        </div>
        <div className='article-image post4'>
          <img src={test4} alt='test1' />
        </div>
        <div className='article-image post5'>
          <img src={test5} alt='test1' />
        </div>
        <div className='article-image post6'>
          <img src={test6} alt='test1' />
        </div>
      </div>
    );
  };

  const renderSavedPosts = () => {
    return (
      <div className='article-group'>
        <div className='article-image post1'></div>
        <div className='article-image post2'></div>
      </div>
    );
  };

  const renderPost = () => {
    return (
      <div className='dvPost'>
        <header>
          <div className='dvProfileImg'>
            <FontAwesomeIcon icon={faUser} />
          </div>
          <ul>
            <li>
              <span className='spTitle'>RooTrip</span>
              <button
                className='btProfileEdit'
                onClick={() => setArticleTab('edit')}
              >
                프로필 편집
              </button>
            </li>
            <li>
              <span className='spTrip'>여행</span>2
              <span className='spFriends'>친구</span>92
            </li>
            <li className='introduce-text'>
              <span className='spInro'>당신의 이야기를 들려주세요!</span>
            </li>
          </ul>
        </header>
        <div className='article-gnb'>
          <ul>
            <li
              className={activeTab === 'travel' ? 'checked' : ''}
              onClick={() => setActiveTab('travel')}
            >
              <FontAwesomeIcon icon={faPlaneUp} />
              여행
            </li>
            <li
              className={activeTab === 'saved' ? 'checked' : ''}
              onClick={() => setActiveTab('saved')}
            >
              <FontAwesomeIcon icon={faBookmark} />
              저장
            </li>
          </ul>
        </div>
        <article>
          {activeTab === 'travel' ? renderTravelPosts() : renderSavedPosts()}
        </article>
      </div>
    );
  };

  const renderEdit = () => {
    return (
      <div className='dvPost'>
        <header>
          <div className='dvProfileImg'>
            <FontAwesomeIcon icon={faUser} />
          </div>
          <ul>
            <li>
              <span className='spTitle'>RooTrip</span>
              <button
                className='btProfileEdit'
                onClick={() => setArticleTab('post')}
              >
                돌아가기
              </button>
            </li>
            <li>
              <span className='spTrip'>여행</span>2
              <span className='spFriends'>친구</span>92
            </li>
            <li className='introduce-text'>
              <span className='spInro'>당신의 이야기를 들려주세요!</span>
            </li>
          </ul>
        </header>
        <main>
          <div className='main-header'>
            <span>프로필 편집</span>
            <div className='profile-img'></div>
            <input type='file' id='profile-img' hidden />
            <label htmlFor='profile-img'>프로필 사진 변경</label>
          </div>
          <ul className='main-profile-change'>
            <li>
              <p className='spNickName'>닉네임</p>
              <input type='text' name='nickName' value='' />
            </li>
            <li>
              <p className='spIntroduceText'>소개</p>
              <input type='text' name='introduceText' value='' />
            </li>
          </ul>
        </main>
        <footer>
          <button className='btChange'>변경하기</button>
        </footer>
      </div>
    );
  };

  return <div>{articleTab === 'post' ? renderPost() : renderEdit()}</div>;
};

export default Profile;
