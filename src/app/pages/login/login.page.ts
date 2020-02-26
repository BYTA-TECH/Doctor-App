import { Util } from './../../services/util';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { Storage } from '@ionic/storage';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  static _INVALID_PASSWORD_USERNAME = 'Invalid Username Or Password';
  static resetflag = false;
  username: string;
  password: string;
  showLoginError = false;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  constructor(
    private keycloakService: KeycloakService,
    private util: Util,
    private storage: Storage
    // private resetService: ResetService
  ) { }

  ngOnInit() {
  }

  isAuthenticated() {
    this.util.createLoader().then(loading => {
      loading.present();
      this.keycloakService
        .isAuthenticated()
        .then(status => {
          if (status == true) {
            loading.dismiss();
            // this.getService.forceReset();
            this.util.navigateRoot();
          }
          loading.dismiss();
        })
        .catch(err => {
          loading.dismiss();
        });
    });
  }

  authenticate() {
    if(!this.loginForm.invalid){
    this.setResetFlag(true);
    this.util.createLoader().then(loading => {
      loading.present();
      this.keycloakService
        .authenticate(this.username, this.password)
        .then((data: any) => {
          loading.dismiss();
          console.log(data);
          this.storage.set('user',data);
         // this.forceReset();
          this.util.navigateRoot();
        })
        .catch(err => {
          console.error(err);
          this.util.createToast(LoginPage._INVALID_PASSWORD_USERNAME)
          .then(toast=>{toast.present();});
          loading.dismiss();
        });
    });
  }
  else {
    this.showLoginError = false;
  }
  }

  registerPage() {
     this.util.navigateRegister();
  }
  public getResetFlag() {
    return LoginPage.resetflag;
  }

  public setResetFlag(flag: boolean) {
    LoginPage.resetflag = flag;
  }
  public clear() {
    LoginPage.resetflag = true;
  }
}
