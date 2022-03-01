import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { UserService } from './users/services/user.service';
import { UserEffects } from './users/user.effects';
import { userReducer } from './users/user.reducer';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forRoot({ user: userReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([UserEffects]),
  ],
  providers: [UserService],
})
export class NgRxStoreModule {}
