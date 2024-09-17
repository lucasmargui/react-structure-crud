import React from 'react';
import Image from 'next/image';

interface CardProps {
    imageSrc: string;
    title: string;
    material: string;
    price: string;
    description: string;
    link?: string; // Tornar 'link' opcional
  }

  const Card: React.FC<CardProps> = ({ imageSrc, title, material, price, description, link = "#!" }) => {
    return (

    <div className="col-md-2"> 
      <div className="card h-100">
      <Image
          src={imageSrc}
          className="card-img-top"
          alt="Description of the image"
          width={400} // Replace with actual width
          height={300} // Replace with actual height
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
              <strong>Material:</strong> {material}<br />
              <strong>Price:</strong> {price}<br />
              <strong>Description:</strong> {description}
          </p>
          <a href="#!" className="btn btn-primary" data-mdb-ripple-init>
            Buy
          </a>
        </div>
      </div>
    </div>



    );
  };

export default Card;
