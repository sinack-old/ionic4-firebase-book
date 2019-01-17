import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(
        private afAuth: AngularFireAuth,
        private router: Router
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.afAuth.authState.pipe(
            // ログインの状態を取得する
            take(1),
            map(user => {
                if (user !== null) {
                    // ログインしていた場合userにユーザーの情報が入る
                    return true;
                } else {
                    // ログインしていない場合は/loginに移動する
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        );
    }
}
