import {User as FirebaseUser} from 'firebase/auth';

// export interface UserInfo {
//   uid: string;
//   email: string;
// }

export interface AppState {
  user: FirebaseUser | null;
}

export const initialState: AppState = {
  user: null,
};

export const setUser = (payload: FirebaseUser) => ({
  type: 'setUser',
  payload,
});

export const resetUser = (payload: FirebaseUser) => ({
  type: 'resetUser',
  payload,
});

export type Action = ReturnType<typeof setUser> | ReturnType<typeof resetUser>;

export const appReducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case 'setUser':
      state.user = action.payload;
      break;
    case 'resetUser':
      state.user = null;
      break;
  }
};
