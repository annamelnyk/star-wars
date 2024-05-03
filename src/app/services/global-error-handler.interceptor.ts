import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err) {
          switch (err.status) {
            case 404:
              console.log('404 error')
              break
            default:
              console.log('error:', err)
          }
        }
        throw err
      }))
  }
}
