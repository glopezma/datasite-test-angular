import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, forkJoin, map, of, switchMap, take, tap } from 'rxjs';
import { UserService } from './services/user.service';
import { setUsers, setUsersFailure, setUsersSuccess } from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getRegisteredUsers$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(setUsers),
      switchMap(() =>
        forkJoin([
          this.userService.getRegisteredUsers(),
          this.userService.getUnregisteredUsers(),
          this.userService.getProjectMemberships(),
        ]).pipe(
          take(1),
          map((resp) => {
            const projectIds = resp[2];
            const registeredUsers = [
              ...resp[0].map((user) => ({
                ...user,
                registered: true,
              })),
            ];
            const unregisteredUsers = [
              ...resp[1].map((user) => ({
                ...user,
                registered: false,
              })),
            ];
            const combinedUserList = [
              ...registeredUsers,
              ...unregisteredUsers,
            ].map((user) => {
              return {
                ...user,
                projectIds: projectIds
                  .filter((project) => project.userId === user.id)
                  .map((project) => project.projectId),
              };
            });
            return setUsersSuccess(combinedUserList);
          }),
          catchError((error) => of(setUsersFailure({ error })))
        )
      )
    )
  );
}
