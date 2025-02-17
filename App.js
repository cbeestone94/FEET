import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    // Check if notification permission is already granted
    if (Notification.permission === 'granted') {
      setIsPermissionGranted(true);
    }
  }, []);

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setIsPermissionGranted(true);
    }
  };

  const startReminders = () => {
    if (!isPermissionGranted) {
      requestPermission();
      return;
    }

    // Set up hourly notifications
    const id = setInterval(() => {
      new Notification('Wellness Check-in', {
        body: 'Take a moment to check in with yourself. How are you feeling?',
        icon: '/favicon.ico', // You can add a custom icon
      });
    }, 60 * 60 * 1000); // 60 minutes in milliseconds

    setTimerId(id);
    setIsActive(true);

    // Send first notification immediately
    new Notification('Wellness Check-in', {
      body: 'Take a moment to check in with yourself. How are you feeling?',
      icon: '/favicon.ico',
    });
  };

  const stopReminders = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
    setIsActive(false);
  };

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Wellness Reminder</h1>
        <p className="description">
          You'll receive hourly reminders to check in with yourself.
        </p>
        {!isPermissionGranted && (
          <button className="button" onClick={requestPermission}>
            Allow Notifications
          </button>
        )}
        {isPermissionGranted && !isActive && (
          <button className="button start" onClick={startReminders}>
            Start Hourly Reminders
          </button>
        )}
        {isActive && (
          <button className="button stop" onClick={stopReminders}>
            Stop Reminders
          </button>
        )}
      </div>
    </div>
  );
}

export default App; 