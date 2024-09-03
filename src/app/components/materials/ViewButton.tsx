import React from 'react';

interface ViewButtonProps {
  materialId: number | undefined; // Defina o tipo adequado para `materialId`, por exemplo, number ou string
}

const ViewButton: React.FC<ViewButtonProps> = ({ materialId }) => {

  return (
    <a href={`/materials/${materialId}`} className="btn btn-sm btn-primary me-2">
    View
    </a>
  )
};

export default ViewButton;
