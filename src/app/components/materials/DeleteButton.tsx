import React from 'react';

import { deleteMaterial  } from '@/app/lib/actions/materialsService';

interface DeleteButtonProps {
  materialId: number | undefined; // Defina o tipo adequado para `materialId`, por exemplo, number ou string
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ materialId }) => {
  

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteMaterial(materialId);
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
