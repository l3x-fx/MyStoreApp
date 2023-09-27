import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PersistanceService } from 'src/app/shared/services/persistance.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(public persistance: PersistanceService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.persistance.get('mystore-token');
    console.log('TOKEN', token);
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(req).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            console.log(event.status);
          }
        },
        (error) => {
          console.error('ERROR MESSAGE', error.status);
          console.error(error.message);
        },
      ),
    );
  }
}

export const TokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};
