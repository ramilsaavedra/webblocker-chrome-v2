import React from 'react';
import success from '../../../../public/images/icons/success.svg';
import error from '../../../../public/images/icons/error.svg';
import style from './notification.module.css';
import { NotificationProps } from './notification.types';

const Notification: React.FC<NotificationProps> = ({ type, message }) => {
  if (!type && !message) {
    return;
  }

  return (
    <div className={style.notification}>
      <img
        className={style['notification-icon']}
        src={type === 'error' ? error : success}
        alt={type}
      />
      <span className={style[`notification-${type}`]}>{message}</span>
    </div>
  );
};
export default Notification;
