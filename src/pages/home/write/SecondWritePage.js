import Photo from '@components/wrapper/Photo';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';

import { resetMap, setChangeCoordinate } from '@store/map';
import { insert, remove, removeAll } from '@store/marker';
import { changeCityToCoordinate } from '@utils/metadata';
import Modal from '@components/wrapper/Modal';

function routeReducer(routes, action) {
  switch (action.type) {
    case 'INSERT':
      return routes.concat(action.id);
    case 'REMOVE':
      return routes.filter((route) => route !== action.id);
    default:
      return routes;
  }
}

const SecondWritePage = ({
  photos,
  prevRoutes,
  setRoutes,
  onMovePage,
  updateCoordinate,
}) => {
  const [routes, dispatchRoute] = useReducer(routeReducer, prevRoutes);
  const [routesOnMap, setRoutesOnMap] = useState([]);
  const [showMessage, setShowMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage('');
      }, 2000);
    }
  }, [showMessage]);

  useEffect(() => {
    if (routesOnMap.length === 0) {
      dispatch(resetMap());
      return;
    }

    const data = changeCityToCoordinate(routesOnMap);
    dispatch(setChangeCoordinate({ data }));
  }, [dispatch, routesOnMap]);

  const onInsert = useCallback(
    (id, photo) => {
      const { url: imageUrl, longitude, latitude } = photo;
      const coordinate = `POINT(${latitude} ${longitude})`;
      dispatchRoute({ type: 'INSERT', id });
      dispatch(insert({ coordinate, imageUrl, id, order: routes.length + 1 }));
      setRoutesOnMap((prevState) => [
        ...prevState,
        { id, coordinate: [longitude, latitude] },
      ]);
    },
    [dispatch, routes],
  );

  const onRemove = useCallback(
    (id) => {
      dispatchRoute({ type: 'REMOVE', id });
      dispatch(remove({ id }));

      const updatedRoutesOnMap = routesOnMap.filter((cur) => cur.id !== id);
      setRoutesOnMap(updatedRoutesOnMap);
    },
    [dispatch, routesOnMap],
  );

  const addRoute = useCallback(
    (id, photo) => {
      if (routes.includes(id)) onRemove(id);
      else onInsert(id, photo);
    },
    [onInsert, onRemove, routes],
  );

  const onPrevPageHandler = useCallback(() => {
    onMovePage(-1);
    dispatch(removeAll());
  }, [dispatch, onMovePage]);

  const onNextPageHandler = useCallback(() => {
    if (routes.length === 0) {
      setShowMessage('경로를 하나 이상 설정해주세요.');
      return;
    }

    onMovePage(1);
    setRoutes(routes);
  }, [routes, onMovePage, setRoutes]);

  return (
    <>
      <div className='Second_modal'>
        <div className='Modal_head'>
          <button
            type='button'
            className='MoveModal F'
            onClick={onPrevPageHandler}
          >
            이전
          </button>
          <span>게시 순서 및 경로 설정</span>
          <button
            type='button'
            className='MoveModal Co'
            onClick={onNextPageHandler}
          >
            다음
          </button>
        </div>
        <div className='Write_content'>
          <div className='Write_list'>
            {photos.map((photo, idx) => (
              <Photo
                key={idx}
                id={idx + 1}
                photo={photo}
                addRoute={addRoute}
                clicked={routes.indexOf(idx + 1) + 1}
                updateCoordinate={updateCoordinate}
              />
            ))}
          </div>
        </div>
      </div>
      {showMessage && (
        <Modal background='white'>
          <div className='modal-message'>
            <p>{showMessage}</p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SecondWritePage;
