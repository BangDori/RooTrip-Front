import { useEffect, useState } from 'react';
import { getOnePost } from '@services/post';

import NAVIGATE_IMAGE from '@assets/navigate_image.png';
import LIKE_IMAGE from '@assets/like_image.png';
import Photos from './article/Photos';
import '@styles/home/article.scss';
import Comment from './article/Comment';

const HomeArticle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    try {
      setIsLoading(false);
      const getLoad = async () => {
        try {
          const data = await getOnePost('496f08eb-27bf-46f5-a63b-d07a6f3a1704');
          setArticle(data);
        } catch (e) {
          alert(e.message);
        }
      };

      getLoad();
      setIsLoading(true);
    } catch (e) {
      alert(e);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  if (!article) return null;

  const { user, photos, title, content, thumbnailImage } = article.post;

  return (
    <div>
      <article>
        <div className='Main_content'>
          <Photos photos={photos} />
          <div className='Content'>
            <div className='Con_pro'>
              <div className='profile_image'></div>
              <h5 className='profile_name'>{user}</h5>
            </div>
            <div className='Photo'>
              <img src={thumbnailImage} alt='사진' />
            </div>
          </div>
          {/* <div className='addr'>
            <span>경상북도 경산시 대학로 280 or (영남대 정문)</span>
          </div> */}
          <div className='article'>
            <div className='header-bar'>
              <h4 className='title'>{title}</h4>
              <div className='side-bar'>
                <img src={NAVIGATE_IMAGE} alt='NAVIGATE_IMAGE' />
                <img src={LIKE_IMAGE} alt='LIKE_IMAGE' />
              </div>
            </div>
            <p className='content'>{content}</p>
          </div>
          <Comment />
        </div>
      </article>
    </div>
  );
};

export default HomeArticle;
