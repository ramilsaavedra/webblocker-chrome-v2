import React, { useContext } from 'react';
import Notification from '../components/Notification';
import NotificationContext from '../context/NotificationContext';

const NotificationWrap = () => {
  const { notification } = useContext(NotificationContext);
  return (
    <div className='notificationWrap'>
      <Notification type={notification.type} message={notification.message} />
    </div>
  );
};

export default NotificationWrap;
