import React, { useContext } from 'react';
import Notification from '../components/Notification';
import NotificationContext from '../context/NotificationContext';

const NotificationWrap = () => {
  const { notification } = useContext(NotificationContext);
  return (
    <>
      <Notification type={notification.type} message={notification.message} />
    </>
  );
};

export default NotificationWrap;
