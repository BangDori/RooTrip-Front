import { loader as socialLoginLoader } from '@pages/social/SocialLogin';

const social = {
  path: 'oauth/:provider/*',
  loader: socialLoginLoader,
};

export default social;
