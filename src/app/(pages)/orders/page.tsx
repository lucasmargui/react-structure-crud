import Button from '@/app/components/Button';
import Title from '@/app/components/orders/Title';
import Table from '@/app/components/orders/Table';

export default async function OrdersPage() {

  return (
<div className="container mt-3">
  <div className="row justify-content-center">
    <div className="col-lg-8 col-md-8 col-sm-8">
      <div className="card">
        <div className="card-body d-flex flex-column">
          <Title />
          <div className="d-flex justify-content-end mb-2">
            <Button text='Create Order' href={`/orders/create`} className='btn btn-success'></Button>
          </div>
          <Table />
        </div>
      </div>
    </div>
  </div>
</div>

  );
};


