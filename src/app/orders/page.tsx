import Button from '@/app/components/Button';
import Title from '@/app/components/orders/Title';
import Table from '@/app/components/orders/Table';

import styles from './page.module.css';

export default async function OrdersPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const query = '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 10;

  return (
    <div className={styles.main}>
      <Title />
      <Button text='Create Order' href={`/orders/create` } className='btn btn-success me-2'></Button>
      <Table query={query} currentPage={currentPage} />
    </div>
  );
};


