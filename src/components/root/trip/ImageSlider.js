import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '@styles/root/trip/ImageSlider.scss';

const ImageSlider = ({ photos, curPage, totPage, setCurPage }) => {
  return (
    <div className='image-slide'>
      {curPage > 1 && (
        <FontAwesomeIcon
          icon={faCircleArrowLeft}
          className='fa-left direction'
          onClick={() => setCurPage((prevPage) => prevPage - 1)}
        />
      )}
      {curPage < totPage && (
        <FontAwesomeIcon
          icon={faCircleArrowRight}
          className='fa-right direction'
          onClick={() => setCurPage((prevPage) => prevPage + 1)}
        />
      )}
      <div className='photo' style={{ left: `${-480 * (curPage - 1)}px` }}>
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.imageUrl}
            alt={`${photo.city} ${photo.first}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
