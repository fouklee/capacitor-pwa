import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Share } from '@capacitor/share';
import { AlertController, ToastController } from '@ionic/angular';
import { MessagingService } from '../services/messaging.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    myImage = null;
    position: Position = null;

    constructor(
        private messagingService: MessagingService,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController
    ) {
        this.listenForMessages();
    }

    listenForMessages() {
        this.messagingService.getMessages().subscribe(async (msg: any) => {
            const alert = await this.alertCtrl.create({
                header: msg.notification.title,
                subHeader: msg.notification.body,
                message: msg.data.info,
                buttons: ['OK'],
            });

            await alert.present();
        });
    }

    requestPermission() {
        this.messagingService.requestPermission().subscribe(
            async token => {
                const toast = await this.toastCtrl.create({
                    message: 'Got your token',
                    duration: 2000
                });
                toast.present();
            },
            async (err) => {
                const alert = await this.alertCtrl.create({
                    header: 'Error',
                    message: err,
                    buttons: ['OK'],
                });

                await alert.present();
            }
        );
    }

    async deleteToken() {
        this.messagingService.deleteToken();
        const toast = await this.toastCtrl.create({
            message: 'Token removed',
            duration: 2000
        });
        toast.present();
    }
    async takePicture() {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera
        });

        this.myImage = image.webPath;
    }


    async getCurrentPosition() {
        const coordinates = await Geolocation.getCurrentPosition();

        this.position = coordinates;
    }

    async share() {
        await Share.share({
            title: 'Come and find me',
            text: `Here's my current location:
            ${this.position.coords.latitude},
            ${this.position.coords.longitude}`,
            url: 'http://ionicacademy.com/'
        });
    }
}
