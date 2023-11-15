import { endFile } from '../custom';
import { resetMap } from '../map';
import { resetMarkers } from '../marker';

const reset =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type !== resetMarkers.type) return next(action);

    const { prevType } = action.payload;

    if (prevType === 'WRITE') {
      dispatch(endFile());
      dispatch(resetMap());
    }
    return next(action);
  };

export default reset;
