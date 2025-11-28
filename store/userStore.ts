import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type User = {
  id: string;
  name: string;
  fullName: string;
};

type UserStore = {
  user: User | null;
  updateUserInformation: (value: User) => void;
  resetUser: () => void;
};

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,

        updateUserInformation: (value: User) =>
          set({ user: value }, false, 'user/updateInformation'),

        resetUser: () => set({ user: null }, false, 'user/reset'),
      }),
      {
        name: 'user-information',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
