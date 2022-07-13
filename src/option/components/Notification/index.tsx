import React from 'react';
import success from '../../../../public/images/icons/success.svg';
import error from '../../../../public/images/icons/error.svg';
import style from './notification.module.css';

interface NotificationProps {
  type: 'success' | 'error';
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ type, message }) => {
  return (
    <div className={style.notification}>
      <img
        className={style['notification-icon']}
        src={type === 'success' ? success : error}
      />
      <span className={style[`notification-${type}`]}>{message}</span>
    </div>
  );
};
export default Notification;
