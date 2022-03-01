import { createReducer, on } from '@ngrx/store';
import { UserState } from './models/user-state.interface';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

const initialUserState: UserState = {
  users: [],
  isGettingUsers: false,
  error: null,
};

const _userReducer = createReducer(
  initialUserState,
  on(UserActions.setUsers, (state) => ({
    ...state,
    isGettingUsers: true,
  })),
  on(UserActions.setUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    isGettingUsers: false,
  })),
  on(UserActions.setUsersFailure, (state, { error }) => ({
    ...state,
    error,
    isGettingUsers: false,
  }))
);

export function userReducer(state: UserState | undefined, action: any) {
  return _userReducer(state, action);
}
