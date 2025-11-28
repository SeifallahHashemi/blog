import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type UserUpdateValue = {
  id: string;
  name: string;
  fullName: string;
};
type UserState = {
  userId: string;
  userName: string;
  userFullName: string;
};

type UserStore = {
  user: UserState;
  updateUserInformation: (value: UserUpdateValue) => void;
};

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: {
          userId: '',
          userName: '',
          userFullName: '',
        },
        updateUserInformation: (value: UserUpdateValue) => {
          set(
            {
              user: {
                userId: value.id,
                userName: value.name,
                userFullName: value.fullName,
              },
            },
            false,
            'user/updateInformation'
          );
        },
      }),
      {
        name: 'user-information',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    {
      name: 'User Store Persisted',
    }
  )
);
