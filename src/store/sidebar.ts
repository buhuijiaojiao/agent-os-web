import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  isCollapsed: boolean;
  toggle: () => void;
  setCollapsed: (collapsed: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      isCollapsed: false,
      toggle: () => set({ isCollapsed: !get().isCollapsed }),
      setCollapsed: (isCollapsed) => set({ isCollapsed }),
    }),
    {
      name: 'sidebar-storage',
    }
  )
);
