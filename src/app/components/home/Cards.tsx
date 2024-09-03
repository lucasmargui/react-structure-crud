import React from 'react';

import Card from "./Card";
import styles from './Cards.module.css'; // Importar o CSS para estilização

  const Cards = () => {
    return (
      <section>
        <div className={styles.cardRow}>
        <Card 
          imageSrc="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
          title="Item 1"
          material="Wood"
          price="$199.99"
          description="High-quality wooden table with a sleek design style."
          link="#!"
        />
        <Card 
          imageSrc="https://mdbootstrap.com/img/new/standard/nature/185.jpg"
          title="Item 2"
          material="Metal"
          price="$299.99"
          description="Durable metal chair with ergonomic design style."
          link="https://example.com/item2"
        />
        <Card 
          imageSrc="https://mdbootstrap.com/img/new/standard/nature/186.jpg"
          title="Item 3"
          material="Glass"
          price="$399.99"
          description="Elegant glass coffee table with modern style."
          link="https://example.com/item3"
        />
      </div>
     </section>
    );
  };

export default Cards;