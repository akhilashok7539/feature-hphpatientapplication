import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private loginservice:LoginService){
    
  }
  
  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
  //   return this.loginservice.isLoggedIn.pipe(
  //     take(1),
  //     map((isLoggedIn: boolean) => {
  //       if (!isLoggedIn) {
  //         this.router.navigate(['/Login']);
  //         return false;
  //       }
  //       return true;
  //     })
  //     );
  //   }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   
    if (localStorage.getItem('currentPatient')) {
        // logged in so return true
        // history.pushState(null, document.title, location.href);
        // history.pushState(null, document.title, location.href);
        // history.pushState('/ProfileHome', document.title, location.href);
        // window.addEventListener('popstate', function (event)
        // {
          
        //   history.pushState('/ProfileHome', document.title, location.href);
        // });
        history.pushState(null, null, location.href);
        window.onpopstate = function () {
        history.go(1);
        };
       
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/Login'], 
    { 
      queryParams: 
      { returnUrl: state.url 
      }
    }
    );
    return false;
}
  }
