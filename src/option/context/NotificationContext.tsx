import React, { createContext, useState } from 'react';
import { NotificationProps } from '../components/Notification/notification.types';

interface NotificationContextInterface {
  notification: NotificationProps;
  notificationHandler: (notification: NotificationProps) => void;
}

interface NotificationProviderProps {
  children?: React.ReactNode;
}

const defaultContext: NotificationContextInterface = {
  notification: { type: null, message: null },
  notificationHandler: () => {},
};

const NotificationContext =
  createContext<NotificationContextInterface>(defaultContext);

let timeout: ReturnType<typeof setTimeout>;

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notification, setNotification] = useState({
    type: null,
    message: null,
  });

  const notificationHandler = (notification: NotificationProps) => {
    setNotification(notification);
    clearNotification();
  };

  const clearNotification = () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      setNotification({ type: null, message: null });
    }, 3000);
  };

  return (
    <NotificationContext.Provider
      value={{
        notification: notification,
        notificationHandler: notificationHandler,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
