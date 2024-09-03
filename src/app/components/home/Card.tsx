import React from 'react';


import styles from './Card.module.css'; // Importar o CSS para estilização


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
      <div className={styles.card}>
        <div className={`${styles.bgImage} ${styles.hoverOverlay}`} data-mdb-ripple-init data-mdb-ripple-color="light">
          <img src={imageSrc} className={styles.imgFluid} alt={title} />
          <a href={link}>
            <div className={styles.mask} style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
          </a>
        </div>
        <div className={styles.cardBody}>
          <h5 className={styles.cardTitle}>{title}</h5>
          <p className={styles.cardText}>
            <strong>Material:</strong> {material}<br />
            <strong>Price:</strong> {price}<br />
            <strong>Description:</strong> {description}
          </p>
          <a href={link} className="btn btn-primary" data-mdb-ripple-init>Buy Now</a>
        </div>
      </div>
    );
  };

export default Card;
