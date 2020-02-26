import { Util } from './../../services/util';
import { Component, OnInit } from '@angular/core';
import UserRepresentation from 'keycloak-admin/lib/defs/userRepresentation';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { DoctorDTO } from 'src/app/api/models';
import { CommandResourceService } from 'src/app/api/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  static resetflag = false;
  showSignupError = false;
  doctor: DoctorDTO = {};

  password: string;


  signupForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$')
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.minLength(6),
      Validators.maxLength(15)
    ]),
    specialization: new FormControl('', [Validators.required]),
    registerNumber: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required])
  });

  constructor(private util: Util,
              private keycloakService: KeycloakService,
              private commandResourceService: CommandResourceService) { }

  ngOnInit() {
  }

  public getResetFlag() {
    return RegisterPage.resetflag;
  }

  public setResetFlag(flag: boolean) {
    RegisterPage.resetflag = flag;
  }
  public clear() {
    RegisterPage.resetflag = true;
  }

  createAccount() {
    if(!this.signupForm.valid){
    this.util.createLoader().then(loading => {
      loading.present();
      console.log("Doctor "+this.doctor+" password "+this.password);
      this.addDoctor(this.doctor, this.password , () => {
        this.setResetFlag(true);
        loading.dismiss();
        this.util.navigateLogin();
      } , (err) => {
        this.util.createToast('Unable To create Account').then(toast => {
          toast.present();
          loading.dismiss();
        });
      });
    });
} else {
    this.showSignupError = true;
  }  
}

  public addDoctor(doctor: DoctorDTO , password , success, error) {
    const user: UserRepresentation = {};
    user.email = doctor.email;
    user.firstName = doctor.firstName.split(' ')[0];
    user.lastName = user.firstName.split(' ')[1];
    user.username = doctor.doctorIdpCode;
    return this.keycloakService.createAccount(user, password,
      () => {
        this.keycloakService.authenticate(doctor.doctorIdpCode , password)
        .then(data => {
          return this.createDoctor(doctor).toPromise()
          // tslint:disable-next-line: no-shadowed-variable
          .then( data => {
            success();
            console.log(data);
          })
          .catch(err => {
            this.keycloakService.logout(false);
            error();
          });
        });
      }, error)
    .catch(() => {error(); });
  }

  createDoctor(doctor: DoctorDTO) {
    return this.commandResourceService.createDoctorUsingPOST(doctor);
  }
}
