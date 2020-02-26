import { Injectable } from '@angular/core';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable()
export class Util {

    constructor(
        private loadingController: LoadingController,
        private toastController: ToastController,
        private navController: NavController,
        private routes: Router
    ) {}

    async createLoader() {

        return await this.loadingController.create({
            spinner: 'bubbles'
        });
    }

    async createToast(msg: string) {
       return await this.toastController.create({
            message: msg ,
            duration: 2000,
            color: 'light',
            position: 'top',
            showCloseButton : true,
            keyboardClose: true,
            buttons: [
              {
                side: 'start',
                icon: 'warning',
              }]
          });
    }

    navigateRoot() {
        this.navController.navigateForward('');
    }

    navigateRegister() {
        this.navController.navigateForward('/register');
    }

    navigateLogin() {
        this.navController.navigateBack('/login');
    }

    navigateDashboard() {
        this.navController.navigateBack('/tabs/dashboard');
    }

    navigateProfile() {
        this.navController.navigateForward('/tabs/profile');
    }

    navigateAppointments() {
        this.navController.navigateForward('/tabs/appointment');
    }

    navigateConsultation(token) {
    }

    navigateSettings() {
        this.navController.navigateForward('/settings');
    }

    navigateSessions() {
        this.navController.navigateForward('/sessions');
    }
}

