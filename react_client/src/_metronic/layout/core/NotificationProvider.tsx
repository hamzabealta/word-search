import { createContext, useContext, useState } from 'react';
import { NotificationMessage, WithChildren } from '../../helpers';

type NotificationType = 'success' | 'error' | 'info';

export interface NotificationContextModel {
  showNotification: (type: NotificationType, text: string) => void;
}

export const NotificationContext = createContext<NotificationContextModel>({
  showNotification: () => { },
});

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<WithChildren> = ({ children }) => {
  const [notifications, setNotifications] = useState<{
    id: number;
    type: NotificationType;
    text: string;
  }[]>([]);

  const showNotification = (type: NotificationType, text: string) => {
    const id = Date.now();
    setNotifications([...notifications, { id, type, text }]);
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div 
      key="notifications"
        style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        minWidth: 300,
        zIndex: 1000,
      }}>
        {notifications.map((notification) => (
          <NotificationMessage
            key={notification.id}
            id={notification.id}
            message={notification.text}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          /> 
        ))}
      </div>

    </NotificationContext.Provider>
  );
};
