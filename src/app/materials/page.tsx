import Button from '@/app/components/Button';
import Title from '@/app/components/materials/Title';
import Table from '@/app/components/materials/Table';

import styles from './page.module.css';

export default async function MaterialsPage() {
  return (

    <div className={styles.main}>
   
    <div className="card mt-3">
      <div className="card-body d-flex flex-column">
        <Title />
        <div className="d-flex justify-content-end mb-2">
          <Button text='Create Material' href={`/materials/create`} className='btn btn-success'></Button>
        </div>
        <Table />
      </div>
    </div>
  </div>
  

  );
};


