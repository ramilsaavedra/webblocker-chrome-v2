import React from 'react';
import style from './button.module.css';

type ButtonProps = {
  children?: React.ReactNode;
  type?: string;
  onClick?: () => void;
  id?: string;
};

const Button: React.FC<ButtonProps> = ({ children, type, onClick, id }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`${style.button} ${
        type === 'secondary' && style['button-secondary']
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
