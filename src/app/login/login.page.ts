import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

// Firebase
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
    login: {
        email: string;
        password: string;
    } = {
        email: '',
        password: ''
    };

    constructor(
        private router: Router,
        private toastCtrl: ToastController,
        private afAuth: AngularFireAuth
    ) {}

    ngOnInit() {}

    userLogin() {
        this.afAuth.auth
            .signInWithEmailAndPassword(this.login.email, this.login.password)
            .then(async user => {
                const toast = await this.toastCtrl.create({
                    message: `${user.user.displayName}さん、こんにちは！`,
                    duration: 3000
                });
                await toast.present();
                // ログインできたらメッセージボードに移動する
                this.router.navigate(['/home']);
            })
            .catch(async error => {
                const toast = await this.toastCtrl.create({
                    message: error.toString(),
                    duration: 3000
                });
                await toast.present();
            });
    }

    gotoSignup() {
        this.router.navigateByUrl('/signup');
    }
}