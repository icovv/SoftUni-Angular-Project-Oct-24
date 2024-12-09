import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export const appInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let URL = environment.APIURL;
  if(req.url.startsWith('api')){
    req = req.clone({
      url: req.url.replace('api',URL)
    })
  }
  return next(req).pipe(
    catchError((err) => {
      console.log(err.error.message);
      if(err.status == 0) {
        err.error.message = "The server is not responding. Please try again later!"
      }
      if(err.status == 403){
        localStorage.removeItem('userData')
      }
      // if(err.status == 403){
      //   err.message = "Forbidden or no account in the database!"
      // }
      // if(err.status == 409){
      //   err.message = "Conflict has occured!"
      // }
      // if(err.status == 404){
      //   err.message = "Not Found"
      // }
      return throwError(() => err.error.message) 
    })
  )
};
