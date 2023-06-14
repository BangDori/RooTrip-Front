import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getOnePost } from '@services/post';
import { setChangeCoordinate, resetMap } from '@store/map';
import { exit } from '@store/article';
import { change, load, removeAll } from '@store/marker';
import { changeCityToCoordinate } from '@utils/metadata';
import Menu from '@constants/menu';
import Modal from '@components/wrapper/Modal';
import NavigationImage from '@assets/navigation.png';
import DefaultImage from '@assets/user/default.png';
import Photos from './post/Photos';
import Comment from './post/Comment';
import LikeButton from './post/LikeButton';
import Content from './post/Content';
import '@styles/home/article.scss';
import '@styles/components/modalPost.scss';

const Post = ({ postId, accessToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLikedPost, setIsLikedPost] = useState(false);
  const [isPostModal, setIsPostModal] = useState(false);
  const [postView, setPostView] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [article, setArticle] = useState(null);
  const [commentsCount, setCommentsCount] = useState(0);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isRouting, setIsRouting] = useState(false);
  const [prevMarkers, setPrevMarkers] = useState([]);

  const marker = useSelector((state) => state.marker.marker);
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
          } = await getOnePost(accessToken, postId);

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
  }, [accessToken, postId, isLoading]);

  const onChangePhoto = useCallback((move) => {
    setCurrentPhoto((prevPhoto) => prevPhoto + move);
  }, []);

  const onClickNavigationHandler = useCallback(() => {
    if (isRouting) {
      setIsRouting(false);
      dispatch(change({ clickedMenu: Menu.TRIP }));
      dispatch(resetMap());
      dispatch(removeAll());
      dispatch(load({ prevMarkers }));
      setPrevMarkers([]);
      return;
    }

    const { routes } = article;
    if (routes.length === 0) return;

    setPrevMarkers(marker);
    dispatch(removeAll());
    dispatch(change({ clickedMenu: Menu.ORDER }));
    const updateMarker = () => {
      const data = photos.map((photo) =>
        routes.includes(String(photo.order + 1))
          ? {
              id: photo.id,
              imageUrl: photo.imageUrl,
              coordinate: photo.coordinate,
              order: routes.indexOf(String(photo.order + 1)) + 1,
            }
          : null,
      );
      dispatch(load({ data }));
    };

    const updateCoordinate = () => {
      const movedPoint = photos.map((photo) => {
        if (!photo.coordinate || !routes.includes(String(photo.order + 1)))
          return null;

        const coordinateString = photo.coordinate
          .replace('POINT(', '')
          .replace(')', '');

        const [lng, lat] = coordinateString.split(' ');

        return {
          id: photo.id,
          name: photo.city,
          coordinate: [Number(lat), Number(lng)],
        };
      });
      const data = changeCityToCoordinate(movedPoint);
      dispatch(setChangeCoordinate({ data }));
    };

    updateMarker();
    updateCoordinate();
    setIsRouting(true);
  }, [dispatch, article, photos, isRouting, prevMarkers, marker]);

  const onCloseArticle = useCallback(() => {
    dispatch(exit());
  }, [dispatch]);

  const onClickPostModalHandler = useCallback(() => {
    setIsPostModal((prevState) => !prevState);
  }, []);

  const onAddCommentHandler = useCallback(() => {
    setCommentsCount((prevState) => prevState + 1);
  }, []);

  if (!isLoading) return null;

  if (!article) return null;

  const { user, title, content, like } = article;
  const { profileImage, name } = user;

  const others = { postView, isLikedPost, like, commentsCount };

  return (
    <div>
      <article>
        <div id={postId} className='Main_content'>
          <div className='article_head'>
            <div className='Con_pro'>
              <div className='profile_image'>
                <img
                  src={
                    DefaultImage
                    // profileImage.length === 0 ? DefaultProfile : profileImage
                  }
                  alt='user profile image'
                />
              </div>
              <h5 className='profile_name'>{name}</h5>
            </div>

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
                <button type='button' onClick={onClickNavigationHandler}>
                  <img src={NavigationImage} alt='NAVIGATE_IMAGE' />
                </button>
                <LikeButton
                  accessToken={accessToken}
                  postId={postId}
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
            postId={postId}
            onAddComment={onAddCommentHandler}
          />
        </div>
      </article>
      {isPostModal && (
        <Modal className='modal-post-more' onClose={onClickPostModalHandler}>
          <Content
            accessToken={accessToken}
            postId={postId}
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
