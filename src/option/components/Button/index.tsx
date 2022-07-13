import React from 'react';
import style from './button.module.css';

type ButtonProps = {
  children?: React.ReactNode;
  variant?: 'secondary';
};

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ variant, children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`${className} ${style.button} ${
        variant === 'secondary' && style['button-secondary']
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
