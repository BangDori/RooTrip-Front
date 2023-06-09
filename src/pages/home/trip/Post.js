import { useCallback, useEffect, useState } from 'react';
import { exit } from '@store/article';
import { removeOnMap } from '@store/marker';
import { useDispatch } from 'react-redux';
import { getOnePost, deletePost } from '@services/post';

import Modal from '@components/wrapper/Modal';
import NAVIGATE_IMAGE from '@assets/navigate_image.png';
import DefaultProfile from '@assets/DefaultProfileImage.png';
import Photos from './post/Photos';
import Comment from './post/Comment';
import LikeButton from './post/LikeButton';
import Content from './post/Content';
import '@styles/home/article.scss';
import '@styles/components/modalPost.scss';

const Post = ({ id, accessToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLikedPost, setIsLikedPost] = useState(false);
  const [isPostModal, setIsPostModal] = useState(false);
  const [postView, setPostView] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [article, setArticle] = useState(null);
  const [commentsCount, setCommentsCount] = useState(0);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      setIsLoading(false);
      const getLoad = async () => {
        try {
          const {
            postViews,
            post,
            photos: photosArray,
            isLiked,
            commentCount,
          } = await getOnePost(accessToken, id);

          setPhotos(photosArray);
          setArticle(post);
          setIsLikedPost(isLiked);
          setCommentsCount(commentCount);
          setCurrentPhoto(0);
          setPostView(postViews);
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

  const onAddCommentHandler = useCallback(() => {
    setCommentsCount((prevState) => prevState + 1);
  }, []);

  const onClickDeleteHandler = useCallback(async () => {
    try {
      const confirm = window.confirm('정말 삭제하시겠습니까?');

      if (confirm) {
        const status = await deletePost(accessToken, id);
        if (status) dispatch(removeOnMap({ id }));
      }
    } catch (e) {
      alert(e.message);
    }
  }, [dispatch, accessToken, id]);

  if (!isLoading) return null;

  if (!article) return null;

  const { user, title, content, like } = article;
  const { profileImage, name } = user;

  const others = { postView, isLikedPost, like, commentsCount };

  return (
    <div>
      <article>
        <div id={id} className='Main_content'>
          <div className='article_head'>
            <div className='Con_pro'>
              <div className='profile_image'>
                <img
                  src={
                    DefaultProfile
                    // profileImage.length === 0 ? DefaultProfile : profileImage
                  }
                  alt='user profile image'
                />
              </div>
              <h5 className='profile_name'>{name}</h5>
            </div>

            <button className='delete-button' onClick={onClickDeleteHandler}>
              게시글 삭제
            </button>
            <span className='photo_page'>{`${currentPhoto + 1}/${
              photos.length
            }`}</span>
            <button className='close_button' onClick={onCloseArticle}>
              X
            </button>
          </div>
          <div className='Content'>
            <Photos
              photoWidth={456}
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
              <div className='left-bar'>
                <h4 className='title'>{title}</h4>
                <div className='other-info'>
                  <span>조회수 {postView}</span>
                  <span>좋아요 {isLikedPost ? like + 1 : like}</span>
                </div>
              </div>
              <div className='side-bar'>
                <button type='button'>
                  <img src={NAVIGATE_IMAGE} alt='NAVIGATE_IMAGE' />
                </button>
                <LikeButton
                  accessToken={accessToken}
                  postId={id}
                  isLikedPost={isLikedPost}
                  setIsLikedPost={setIsLikedPost}
                />
              </div>
            </div>
            <p className='content'>{content}</p>
            <button
              className='content-more-button'
              onClick={onClickPostModalHandler}
            >
              댓글 {commentsCount}개 모두 보기
            </button>
          </div>
          <Comment
            accessToken={accessToken}
            postId={id}
            onAddComment={onAddCommentHandler}
          />
        </div>
      </article>
      {isPostModal && (
        <Modal className='modal-post-more'>
          <Content
            accessToken={accessToken}
            postId={id}
            post={article}
            photos={photos}
            others={others}
            onClose={onClickPostModalHandler}
          />
        </Modal>
      )}
    </div>
  );
};

export default Post;
