import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {

  let userService = inject(UserService);
  let router = inject(Router);

  if (userService.isLogged && (state.url == '/register' || state.url == '/login')){
    console.log('register page || login page');
    router.navigate(['/home'])
    return false;
  }

  if (!userService.isLogged && (state.url == '/register' || state.url == '/login')){
    console.log('register or login page go ahead');
    return true;
  }

  if(userService.isLogged){
    return true
  }

  router.navigate(['/home'])
  return false;
};
