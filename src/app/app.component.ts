import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { HeaderComponent } from './navigation/header/header.component';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { authActions } from './auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { PersistanceService } from './shared/services/persistance.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidenavComponent,
    HeaderComponent,
    MatSidenavModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MyStoreApp';
  constructor(
    public persistance: PersistanceService,
    private store: Store,
  ) {}

  ngOnInit() {
    this.persistance.get('mystore-token')
      ? this.store.dispatch(authActions.getUser({}))
      : null;
  }
}
