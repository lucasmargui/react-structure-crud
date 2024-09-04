

import Form from '@/app/components/orders/Form';


export default async function EditPage({ params }: { params: { id: string } }) {
    const id = params.id;

  return (
    <main>
      <Form id={id} ></Form>
    </main>
  );
}