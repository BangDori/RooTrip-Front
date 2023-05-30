import Photo from '@components/wrapper/Photo';
import { useCallback, useReducer } from 'react';

function routeReducer(routes, action) {
  switch (action.type) {
    case 'INSERT':
      return routes.concat(action.route);
    case 'REMOVE':
      return routes.filter((route) => route !== action.route);
    default:
      return routes;
  }
}

const SelectImages = ({ photos, setRoutes, onMovePage }) => {
  const [routes, dispatch] = useReducer(routeReducer, []);

  const onInsert = useCallback(
    (route) => dispatch({ type: 'INSERT', route }),
    [],
  );

  const onRemove = useCallback(
    (route) => dispatch({ type: 'REMOVE', route }),
    [],
  );

  const addRoute = useCallback(
    (route) => {
      if (routes.includes(route)) onRemove(route);
      else onInsert(route);
    },
    [onInsert, onRemove, routes],
  );

  const onNextPage = useCallback(() => {
    onMovePage(1);
    setRoutes(routes);
  }, [routes, onMovePage, setRoutes]);

  return (
    <div className='Second_modal'>
      <div className='Modal_head'>
        <button
          type='button'
          className='MoveModal F'
          onClick={() => onMovePage(-1)}
        >
          이전
        </button>
        <span>게시 순서 및 경로 설정</span>
        <button type='button' className='MoveModal Co' onClick={onNextPage}>
          다음
        </button>
      </div>
      <div className='Write_content'>
        <div className='Write_list'>
          {photos.map((photo) => (
            <Photo
              key={photo.feedOrder}
              photo={photo}
              addRoute={addRoute}
              clicked={routes.indexOf(photo.id) + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectImages;
