import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from './store.service';
import { FormsModule } from '@angular/forms';
import { routes } from '../app/app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NoteService } from '../app/services/note.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFontAwesomeModule,
    Ng2SearchPipeModule,
    OrderModule
  ],
  providers: [NoteService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
}
}
