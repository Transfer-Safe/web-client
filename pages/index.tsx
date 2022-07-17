import { Button } from '@nextui-org/react';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <Link href="invoices/new">
        <Button>Create invoice</Button>
      </Link>
    </div>
  );
};

export default Home;
