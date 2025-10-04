import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';

const NotificationBell = () => {
  const { user, userData } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', user.uid),
      where('isRead', '==', false)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notificationData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setNotifications(notificationData);
      setUnreadCount(notificationData.length);
    });

    return () => unsubscribe();
  }, [user]);

  const markAsRead = async (notificationId) => {
    try {
      await updateDoc(doc(db, 'notifications', notificationId), {
        isRead: true,
        readAt: new Date()
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const promises = notifications.map(notification =>
        updateDoc(doc(db, 'notifications', notification.id), {
          isRead: true,
          readAt: new Date()
        })
      );
      await Promise.all(promises);
      setShowDropdown(false);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'tutor_request':
        return '👨‍🏫';
      case 'tuition_application':
        return '📚';
      case 'assignment':
        return '✅';
      case 'payment':
        return '💰';
      case 'system':
        return '🔔';
      default:
        return '📢';
    }
  };

  if (!user) return null;

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span>Notifications</span>
        </div>

        {/* Notification Badge */}
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Mark all read
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {formatTime(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="text-gray-400 text-4xl mb-2">🔔</div>
                <p className="text-gray-500">No new notifications</p>
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-3 border-t bg-gray-50">
              <button
                onClick={() => setShowDropdown(false)}
                className="w-full text-center text-sm text-blue-600 hover:text-blue-700"
              >
                View All Notifications
              </button>
            </div>
          )}
        </div>
      )}

      {/* Backdrop */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default NotificationBell;