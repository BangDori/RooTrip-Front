import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { exit } from '@store/article';
import { resetMap } from '@store/map';
import { change } from '@store/marker';
import Logo from '@assets/Logo.png';
import '@styles/mypage/mypage.scss';
import MypageMenu from '@constants/mypageMenu';
import { likedArticle } from '@services/auth';
import Nav from './Nav';
import Modify from './Modify';
import MyTrip from './MyTrip';
import LikedTrip from './LikedTrip';
import SavedTrip from './SavedTrip';
import Unsigned from './Unsigned';

const Index = () => {
  const { accessToken } = useSelector((state) => state.accessToken);
  const dispatch = useDispatch();
  const mypageMenu = useSelector((state) => state.marker.menu);
  const { postId } = useSelector((state) => state.article);

  const onClickMenuHandler = useCallback(
    (clickedMenu) => {
      dispatch(change({ clickedMenu }));
      dispatch(resetMap());
      if (postId) dispatch(exit());
    },
    [dispatch, postId],
  );

  let content = <Modify />;
  switch (mypageMenu) {
    case MypageMenu.MODIFY:
      content = <Modify accessToken={accessToken} />;
      break;
    case MypageMenu.MYTRIP:
      content = <MyTrip accessToken={accessToken} />;
      break;
    case MypageMenu.LIKEDTRIP:
      content = <LikedTrip accessToken={accessToken} />;
      break;
    case MypageMenu.SAVEDTRIP:
      content = <SavedTrip accessToken={accessToken} />;
      break;
    case MypageMenu.UNSIGNED:
      content = <Unsigned accessToken={accessToken} />;
      break;
    default:
      content = '';
      break;
  }
  return (
    <div>
      <header>
        <Link to='../'>
          <img src={Logo} alt='사진 없음' />
        </Link>
        <h1>마이 페이지</h1>
      </header>
      <content>
        <Nav onClickMenu={onClickMenuHandler}></Nav>
        <div className='contentBox'>{content}</div>
      </content>
      <footer></footer>
    </div>
  );
};

export default Index;
