import { NgRxStoreModule } from './store/ngrx-store.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgRxStoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
