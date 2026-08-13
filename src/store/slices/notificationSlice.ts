import type { StateCreator } from "zustand";
import type { Notification } from "../../types";

export interface NotificationSlice {
  notifications: Notification[];

  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;

  getUnreadCount: () => number;
}

export const createNotificationSlice: StateCreator<
  NotificationSlice,
  [],
  [],
  NotificationSlice
> = (set, get) => ({
  notifications: [],

  setNotifications: (notifications) => set({ notifications }),

  addNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),

  markAsRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true, updatedAt: new Date() } : n
      ),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.read ? n : { ...n, read: true, updatedAt: new Date() }
      ),
    })),

  clearNotifications: () => set({ notifications: [] }),

  getUnreadCount: () => get().notifications.filter((n) => !n.read).length,
});
