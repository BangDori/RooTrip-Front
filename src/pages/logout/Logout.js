import { redirectDocument } from 'react-router-dom';

import store from '@store/configureStore';
import { logoutStore } from '@store/user';

export async function loader() {
  await store.dispatch(logoutStore());
  return redirectDocument('/');
}
