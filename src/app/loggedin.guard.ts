import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class LoggedinGuard implements CanActivate {
    constructor(
        private afAuth: AngularFireAuth,
        private router: Router
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.afAuth.authState.pipe(
            take(1),
            map(user => {
                if (user === null) {
                    return true;
                } else {
                    this.router.navigate(['/home']);
                    return false;
                }
            })
        );
    }
}
