import { endFile } from '../custom';
import { resetMarkers } from '../marker';

const reset =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type !== resetMarkers.type) return next(action);

    const { prevType } = action.payload;

    if (prevType === 'WRITE') {
      dispatch(endFile());
    }
    return next(action);
  };

export default reset;
