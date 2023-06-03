import { useCallback, useEffect, useState } from 'react';
import { getOnePost } from '@services/post';
import { exit } from '@store/article';
import { useDispatch } from 'react-redux';

import Modal from '@components/wrapper/Modal';
import NAVIGATE_IMAGE from '@assets/navigate_image.png';
import DefaultProfile from '@assets/DefaultProfileImage.png';
import Photos from './article/Photos';
import Comment from './article/Comment';
import LikeButton from './article/LikeButton';
import Content from './article/Content';
import '@styles/home/article.scss';

const HomeArticle = ({ id, accessToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLikedPost, setIsLikedPost] = useState(false);
  const [isPostModal, setIsPostModal] = useState(false);
  const [article, setArticle] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      setIsLoading(false);
      const getLoad = async () => {
        try {
          const { postViews, post, isLiked } = await getOnePost(
            accessToken,
            id,
          );

          setArticle(post);
          setIsLikedPost(isLiked);
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

  const onClickPostModalHandler = useCallback(() => {
    setIsPostModal((prevState) => !prevState);
  }, []);

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
                <LikeButton
                  accessToken={accessToken}
                  postId={postId}
                  isLikedPost={isLikedPost}
                />
              </div>
            </div>
            <p className='content'>{content}</p>
            <button
              className='content-more-button'
              onClick={onClickPostModalHandler}
            >
              댓글 {comments.length}개 모두 보기
            </button>
          </div>
          <Comment
            accessToken={accessToken}
            postId={postId}
            comments={comments}
          />
        </div>
      </article>
      {isPostModal && (
        <Modal>
          <Content post={article} onClose={onClickPostModalHandler} />
        </Modal>
      )}
    </div>
  );
};

export default HomeArticle;
