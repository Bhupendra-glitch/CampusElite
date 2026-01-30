
import React from 'react';
import { X, Bell, Briefcase, Code, Clock, Swords, CheckCircle2 } from 'lucide-react';
import { SmartNotification } from '../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: SmartNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<SmartNotification[]>>;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose, notifications, setNotifications }) => {
  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'CT': return <Clock className="text-amber-500" size={18} />;
      case 'INTERN': return <Briefcase className="text-blue-500" size={18} />;
      case 'DSA': return <Code className="text-purple-500" size={18} />;
      case 'CHALLENGE': return <Swords className="text-red-500" size={18} />;
      default: return <Bell size={18} />;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" 
        onClick={onClose}
      />
      <div className="absolute top-0 right-0 h-full w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-indigo-600" />
            <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-xs">Smart Alerts</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  onClick={() => markAsRead(notif.id)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${!notif.isRead ? 'bg-indigo-50/30 dark:bg-indigo-900/10' : ''}`}
                >
                  <div className="flex gap-3">
                    <div className="mt-1 shrink-0">{getIcon(notif.type)}</div>
                    <div className="space-y-1 overflow-hidden">
                      <div className="flex justify-between items-center">
                        <p className={`text-xs font-bold ${!notif.isRead ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}>
                          {notif.title}
                        </p>
                        <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400">
              No new alerts.
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={markAllRead}
            className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-colors"
          >
            <CheckCircle2 size={14} /> Mark all as read
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationCenter;
