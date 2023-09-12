import { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { loadMarkers, removeMarker, resetMarkers } from '@store/marker';
import '@styles/root/post/Post.scss';
import '@styles/root/write/Write.scss';

import MediaUpload from './MediaUpload';
import PostCreation from './PostCreation';

function filesReducer(state, action) {
  switch (action.type) {
    case 'INSERT':
      const newFiles = action.payload.filter((newFile) => {
        let isUnique = true;
        for (let i = 0; i < state.length; i += 1) {
          if (state[i].fileName === newFile.fileName) {
            isUnique = false;
            return;
          }
        }

        if (isUnique) {
          return newFile;
        }

        return null;
      });

      return [...state, ...newFiles];
    case 'REMOVE':
      const filteredFiles = state.filter(
        (photo) => photo.fileName !== action.payload,
      );

      return filteredFiles;
    case 'RESET':
      return [];
    default:
      return state;
  }
}

const Write = () => {
  const [files, filesDispatch] = useReducer(filesReducer, []);
  const [page, setPage] = useState(1);
  const notify = (message, type = 'info') => {
    if (type === 'error') {
      toast.error(message);
      return;
    }
    toast.info(message);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (files.length === 0) setPage(1);
    if (files.length !== 0) setPage(2);
  }, [files.length, dispatch]);

  const onPrevPage = () => {
    setPage((prev) => prev - 1);
    filesDispatch({ type: 'RESET' });
    dispatch(resetMarkers('WRITE'));
  };
  const onUpload = (newFiles) => {
    filesDispatch({ type: 'INSERT', payload: newFiles });
    dispatch(loadMarkers({ files: newFiles }));
  };
  const onRemovePhoto = (fileName) => {
    filesDispatch({ type: 'REMOVE', payload: fileName });
    dispatch(removeMarker({ fileName }));
  };

  return (
    <>
      <div className='post-wrapper'>
        {page === 1 && <MediaUpload onUpload={onUpload} notify={notify} />}
        {page === 2 && (
          <PostCreation
            onPrev={onPrevPage}
            files={files}
            onUpload={onUpload}
            onRemove={onRemovePhoto}
            notify={notify}
          />
        )}
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
