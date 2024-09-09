import React from 'react';


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
        <img
          src={imageSrc}
          className="card-img-top"
       
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
