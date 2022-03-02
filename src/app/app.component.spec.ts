import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { first, skip, take } from 'rxjs';
import { AppComponent } from './app.component';
import { UserState } from './store/users/models/user-state.interface';
import {
  selectAllUsers,
  selectIsGettingUsers,
} from './store/users/user.selectors';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore<UserState>;
  let initialState: UserState = {
    users: [],
    isGettingUsers: false,
    error: null,
  };
  let mockIsGettingUsersSelector: MemoizedSelector<UserState, boolean>;
  let mockUsersSelector: MemoizedSelector<UserState, any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.get<Store>(Store);
    mockIsGettingUsersSelector = store.overrideSelector(
      selectIsGettingUsers,
      false
    );
    mockUsersSelector = store.overrideSelector(selectAllUsers, []);
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show loading until data retrieved', () => {
    const app = fixture.componentInstance;
    mockIsGettingUsersSelector.setResult(true);
    store.refreshState();
    fixture.detectChanges();
    app.loading$.pipe(take(1)).subscribe((loading) => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(loading).toBe(true);
      expect(compiled.querySelector('.loading')?.textContent).toContain(
        'Loading...'
      );
    });
  });

  it('should not show loading when data retrieved', () => {
    const app = fixture.componentInstance;
    mockIsGettingUsersSelector.setResult(false);
    store.refreshState();
    fixture.detectChanges();
    app.loading$.pipe(first()).subscribe((loading) => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(loading).toBe(false);
      expect(compiled.querySelectorAll('.loading').length).toBe(0);
    });
  });
});
