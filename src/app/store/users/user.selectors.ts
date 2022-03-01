import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './models/user-state.interface';
import { userFeatureKey } from './user.reducer';

const selectUserState = createFeatureSelector<UserState>(userFeatureKey);

export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);
export const selectRegisteredUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users.filter((user) => user.registered)
);
export const selectUnregisteredUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users.filter((user) => !user.registered)
);
export const selectIsGettingUsers = createSelector(
  selectUserState,
  (state: UserState) => state.isGettingUsers
);
export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);
