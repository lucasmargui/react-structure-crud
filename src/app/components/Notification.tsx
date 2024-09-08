import React from 'react';
import styles from './Notification.module.css';

type NotificationProps = {
  message: string;
  type: 'info' | 'success' | 'error';
  onClose: () => void;
};

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <span>{message}</span>
      <button className={styles.closeBtn} onClick={onClose}>×</button>
    </div>
  );
};

export default Notification;
