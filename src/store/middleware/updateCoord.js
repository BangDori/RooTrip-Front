import { updateMarker } from '../marker';

const updateCoord =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== updateMarker.type) return next(action);

    next(action);
    return dispatch({ type: 'custom/endFile' });
  };

export default updateCoord;
