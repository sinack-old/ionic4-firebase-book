import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage {
    post: {
        userName: string;
        message: string;
        createdDate: any;
    };
    message: string;

    posts: { userName: string; message: string; createdDate: any }[] = [
        {
            userName: 'Taro Yamada',
            message: 'これはテストメッセージです',
            createdDate: '10分前'
        },
        {
            userName: 'Jiro Suzuki',
            message: 'ふたつめのテストメッセージ！',
            createdDate: '5分前'
        }
    ];

    constructor(private alertCtrl: AlertController) {}

    addPost() {
        // 入力されたメッセージを使って、投稿データを作成
        this.post = {
            userName: 'Akira Yanagihara',
            message: this.message,
            createdDate: '数秒前'
        };
        // 配列postsにpostを追加する
        this.posts.push(this.post);
        // 入力フィールドを空にする
        this.message = '';
    }

    async presentPrompt(index: number) {
        const alert = await this.alertCtrl.create({
            header: 'メッセージ編集',
            inputs: [
                {
                    name: 'message',
                    type: 'text',
                    placeholder: 'メッセージ'
                }
            ],
            buttons: [
                {
                    text: 'キャンセル',
                    role: 'cancel',
                    handler: () => {
                        console.log('キャンセルが選択されました');
                    }
                },
                {
                    text: '更新',
                    handler: data => {
                        console.log(data);
                        this.posts[index].message = data.message;
                    }
                }
            ]
        });
        await alert.present();
    }

    deletePost(index: number) {
        this.posts.splice(index, 1);
    }
}
