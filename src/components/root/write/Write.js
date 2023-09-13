import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import {
  loadMarkers,
  updateMarker,
  removeMarker,
  resetMarkers,
} from '@store/marker';
import '@styles/root/post/Post.scss';
import '@styles/root/write/Write.scss';

import MediaUpload from './MediaUpload';
import PostCreation from './PostCreation';
import Completion from './Completion';

const Write = ({ isSubmitting }) => {
  const { markers, onError } = useSelector((state) => state.marker);
  const [page, setPage] = useState(1);
  const {
    isCustomMode,
    isSetCoordinate,
    fileName: updatedFileName,
    latitude: updatedLat,
    longitude: updatedLng,
  } = useSelector((state) => state.custom);
  const dispatch = useDispatch();

  const notify = (message, type = 'info') => {
    if (type === 'error') {
      toast.error(message);
      return;
    }
    toast.info(message);
  };

  useEffect(() => {
    if (onError) {
      notify(onError, 'error');
    }
  }, [onError]);

  useEffect(() => {
    if (isSetCoordinate) {
      const updatedFile = { updatedFileName, updatedLat, updatedLng };
      dispatch(updateMarker(updatedFile));
    }
  }, [
    dispatch,
    isCustomMode,
    isSetCoordinate,
    updatedFileName,
    updatedLat,
    updatedLng,
  ]);

  useEffect(() => {
    if (markers.length === 0) setPage(1);
    if (markers.length !== 0) setPage(2);
  }, [markers.length]);

  const onNextPage = () => setPage((prev) => prev + 1);
  const onPrevPage = () => {
    setPage((prev) => prev - 1);
    dispatch(resetMarkers({ type: 'WRITE', prevType: 'WRITE' }));
  };
  const onUpload = (newFiles) => dispatch(loadMarkers({ files: newFiles }));
  const onRemovePhoto = (fileName) => dispatch(removeMarker({ fileName }));

  return (
    <>
      <div className='post-wrapper'>
        {isCustomMode && (
          <>
            <p className='custom-message'>
              지도에서 이미지의 위치를 클릭해주세요.
            </p>
            <div className='post-overlay' />
          </>
        )}
        {page === 1 && <MediaUpload onUpload={onUpload} notify={notify} />}
        {page === 2 && (
          <PostCreation
            onPrev={onPrevPage}
            onNext={onNextPage}
            files={markers}
            onUpload={onUpload}
            onRemove={onRemovePhoto}
            notify={notify}
          />
        )}
        {page === 3 && <Completion isSubmitting={isSubmitting} />}
      </div>

      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme='light'
        style={{ fontSize: '12px' }}
      />
    </>
  );
};

export default Write;
