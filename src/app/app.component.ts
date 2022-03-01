import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { User } from './store/users/models/user.interface';
import { setUsers } from './store/users/user.actions';
import {
  selectAllUsers,
  selectIsGettingUsers,
} from './store/users/user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();
  users$: Observable<User[]> = of([]);
  loading$: Observable<boolean> = of(false);

  constructor(private store: Store) {
    this.users$ = this.store.pipe(
      select(selectAllUsers),
      takeUntil(this.unsubscribe$)
    );

    this.loading$ = this.store.pipe(
      select(selectIsGettingUsers),
      takeUntil(this.unsubscribe$)
    );

    this.store.dispatch(setUsers());
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
