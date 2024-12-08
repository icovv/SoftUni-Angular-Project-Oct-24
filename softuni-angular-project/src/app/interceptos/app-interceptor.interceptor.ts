import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const appInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.startsWith('api')){
    req = req.clone({
      url: req.url.replace('api','http://localhost:3030')
    })
  }
  return next(req).pipe(
    catchError((err) => {

      if(err.status == 0) {
        err.message = "The server is not responding. Please try again later!"
      }
      if(err.status == 403){
        err.message = "Forbidden or no account in the database!"
      }
      if(err.status == 409){
        err.message = "Conflict has occured!"
      }
      if(err.status == 404){
        err.message = "Not Found"
      }
      return throwError(() => err.message) 
    })
  )
};
