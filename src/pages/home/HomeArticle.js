import { useCallback, useEffect, useState } from 'react';
import { getOnePost } from '@services/post';
import { exit } from '@store/article';
import { useDispatch } from 'react-redux';

import NAVIGATE_IMAGE from '@assets/navigate_image.png';
import DefaultProfile from '@assets/태훈이 프사.jpg';
import Photos from './article/Photos';
import '@styles/home/article.scss';
import Comment from './article/Comment';
import LikeButton from './article/LikeButton';

const HomeArticle = ({ id, accessToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      setIsLoading(false);
      const getLoad = async () => {
        try {
          const post = await getOnePost(accessToken, id);
          setArticle(post);
          setCurrentPhoto(0);
        } catch (e) {
          alert(e.message);
        }
      };

      getLoad();
      setIsLoading(true);
    } catch (e) {
      alert(e);
    }
  }, [accessToken, id, isLoading]);

  const onChangePhoto = useCallback((move) => {
    setCurrentPhoto((prevPhoto) => prevPhoto + move);
  }, []);

  const onCloseArticle = useCallback(() => {
    dispatch(exit());
  }, [dispatch]);

  if (!isLoading) return null;

  if (!article) return null;

  const { id: postId, user, photos, title, content, comments } = article;
  const { profileImage, name } = user;

  return (
    <div>
      <article>
        <div id={postId} className='Main_content'>
          <div className='article_head'>
            <span className='photo_page'>{`${currentPhoto + 1}/${
              photos.length
            }`}</span>
            <button className='close_button' onClick={onCloseArticle}>
              X
            </button>
          </div>
          <div className='Content'>
            <div className='Con_pro'>
              <div className='profile_image'>
                <img
                  src={
                    profileImage.length === 0 ? DefaultProfile : profileImage
                  }
                  alt='user profile image'
                />
              </div>
              <h5 className='profile_name'>{name}</h5>
            </div>
            <Photos
              photos={photos}
              current={currentPhoto}
              onChangePhoto={onChangePhoto}
            />
          </div>
          {/* <div className='addr'>
            <span>경상북도 경산시 대학로 280 or (영남대 정문)</span>
          </div> */}
          <div className='article'>
            <div className='header-bar'>
              <h4 className='title'>{title}</h4>
              <div className='side-bar'>
                <button type='button'>
                  <img src={NAVIGATE_IMAGE} alt='NAVIGATE_IMAGE' />
                </button>
                <LikeButton accessToken={accessToken} postId={postId} />
              </div>
            </div>
            <p className='content'>{content}</p>
          </div>
          <Comment
            accessToken={accessToken}
            postId={postId}
            comments={comments}
          />
        </div>
      </article>
    </div>
  );
};

export default HomeArticle;
