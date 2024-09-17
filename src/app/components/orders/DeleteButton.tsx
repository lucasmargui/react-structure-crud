import React from 'react';

import { deleteOrder  } from '@/app/lib/actions/ordersService';

interface DeleteButtonProps {
  orderId: number | undefined; // Defina o tipo adequado para `orderId`, por exemplo, number ou string
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ orderId }) => {
  

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteOrder(orderId);
    location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>

      <input type="hidden" name="_method" value="DELETE"  />
      <button type="submit" className="btn btn-sm btn-danger me-2">
        Delete
      </button>
    </form>
  );
};

export default DeleteButton;
