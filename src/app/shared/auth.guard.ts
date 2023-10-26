import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { PersistanceService } from './services/persistance.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private persistanceService: PersistanceService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = !!this.persistanceService.get('mystore-token');
    if (!isAuthenticated) {
      this.router.navigateByUrl('/login');
    }

    return isAuthenticated;
  }
}
