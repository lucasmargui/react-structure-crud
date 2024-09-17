import Button from '@/app/components/Button';
import Title from '@/app/components/materials/Title';
import Table from '@/app/components/materials/Table';

export default async function MaterialsPage() {
  return (

<div className="container mt-3">
  <div className="row">
    <div className="col-lg-12 col-md-12 col-sm-12">
      <div className="card">
        <div className="card-body d-flex flex-column">
          <Title />
          <div className="d-flex justify-content-end mb-2">
            <Button text='Create Material' href={`/materials/create`} className='btn btn-success'></Button>
          </div>
          <Table />
        </div>
      </div>
    </div>
  </div>
</div>
  

  );
};


