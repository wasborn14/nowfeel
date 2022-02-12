import {User as FirebaseUser} from 'firebase/auth';

export interface AppState {
  user: FirebaseUser | undefined;
}

export const initialState: AppState = {
  user: undefined,
};

export const setUser = (payload: FirebaseUser) => ({
  type: 'setUser',
  payload,
});

export const resetUser = () => ({
  type: 'resetUser',
});

export type Action = ReturnType<typeof setUser>;

export const appReducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case 'setUser':
      state.user = action.payload;
      break;
    case 'resetUser':
      state.user = undefined;
      break;
  }
};
