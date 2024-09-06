import Button from '@/app/components/Button';
import Title from '@/app/components/orders/Title';
import Table from '@/app/components/orders/Table';

import styles from './page.module.css';

export default async function OrdersPage() {

  return (

    <div className={styles.main}>
    
    <div className="card mt-3">
      <div className="card-body d-flex flex-column">
        <Title />
        <div className="d-flex justify-content-end mb-2">
          <Button text='Create Order' href={`/orders/create`} className='btn btn-success'></Button>
        </div>
        <Table />
      </div>
    </div>
    </div>
  );
};


