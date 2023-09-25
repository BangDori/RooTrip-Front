import { createBrowserRouter } from 'react-router-dom';

import root from './root';
import auth from './auth';
import social from './social';
import logout from './logout';

const router = createBrowserRouter([root, auth, social, logout]);

export default router;
