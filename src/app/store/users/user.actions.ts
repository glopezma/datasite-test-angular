import { createAction } from '@ngrx/store';
import { User } from './models/user.interface';

export const setUsers = createAction('[Users] Set Users');

export const setUsersSuccess = createAction(
  '[Users] Set User Success',
  (users: User[]) => ({ users })
);
export const setUsersFailure = createAction(
  '[Users] Set User Failure',
  (error: any) => ({ error })
);
export const resetUsers = createAction('[Users] Reset User');
