import React from 'react';

interface ButtonProps {
  text: string;
  href: string; // Defina o tipo adequado para `materialId`, por exemplo, number ou string
  className: string
}

const Button: React.FC<ButtonProps> = ({ text, href, className }) => {

  return (
    <a href={href} className={className}>
        {text}
    </a>
  )
};

export default Button;
