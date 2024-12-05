import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const appInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req)
  if(req.url.startsWith('api')){
    req = req.clone({
      url: req.url.replace('api','http://localhost:3030')
    })
  }
  return next(req).pipe(
    catchError((err) => {
      console.log(`err from interceptor => ${JSON.stringify(err.message)}`)
      if(err.status == 0) {
        err.message = "The server is not responding. Please try again later!"
      }
      if(err.status == 403){
        localStorage.removeItem('userData');
      }
      if(err.status == 409){
        err.message = "Conflict has occured!"
      }
      return throwError(() => err.message) 
    })
  )
};
