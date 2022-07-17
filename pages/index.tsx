import type { NextPage } from 'next';

import { SignIn } from '../components/signin';

const Home: NextPage = () => {
  return (
    <div>
      <SignIn />
    </div>
  );
};

export default Home;
