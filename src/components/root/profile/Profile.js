import '@styles/root/profile/My.scss';
import '@styles/root/profile/Friend.scss';
import '@styles/root/profile/Edit.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlaneUp,
  faBookmark,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('travel');

  const [articleTab, setArticleTab] = useState('post');

  const renderTravelPosts = () => {
    return (
      <div className='article-group'>
        <div className='article-image post1'></div>
        <div className='article-image post2'></div>
        <div className='article-image post3'></div>
        <div className='article-image post4'></div>
        <div className='article-image post5'></div>
        <div className='article-image post6'></div>
        <div className='article-image post7'></div>
        <div className='article-image post8'></div>
        <div className='article-image post9'></div>
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
