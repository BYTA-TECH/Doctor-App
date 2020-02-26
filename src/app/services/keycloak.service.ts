import { KeycloakAdminConfig } from './../configs/keycloak.admin.config';
import { OAuthService } from 'angular-oauth2-oidc';
import { KeycloakAdminClient } from 'keycloak-admin/lib/client';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpHeaders} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Util } from '../services/util';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  realm = 'Ayoos';

  keycloakAdmin: KeycloakAdminClient;

  constructor(
    private oauthService: OAuthService,
    private keycloakConfig: KeycloakAdminConfig,
    private storage: Storage,
    private util: Util
  ) {
    this.keycloakAdmin = this.keycloakConfig.kcAdminClient;
  }


  async createAccount(user: any, password: string , success , error) {
    return this.keycloakConfig.refreshClient().then(() => {
      this.keycloakAdmin = this.keycloakConfig.kcAdminClient;
      user.realm = this.realm;
      user.credentials = [{ type: 'password', value: password }];
      user.attributes = map;
      user.enabled = true;

      console.log(user);

      return this.keycloakAdmin.users.create(user)
      .then(res => {
        console.log('Account Created', res);
        success();
      })
      .catch(err => {
        console.log('IIII', err);
        error(err);
      });

    });
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.oauthService.hasValidAccessToken();
  }

  async authenticate(username: string, password: string): Promise<object> {
    return await this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile (
      username,
      password,
      new HttpHeaders()
    );
  }

  async getCurrentUserDetails() {
    return await this.oauthService.loadUserProfile();
  }

  async updateCurrentUserDetails(keycloakUser: any): Promise<void> {
    return await this.keycloakConfig.refreshClient().then(() => {
      this.keycloakAdmin.users.update(
        {
          id: keycloakUser.sub,
          realm: this.realm
        },
        {
          firstName: keycloakUser.name.split(' ')[0],
          lastName: keycloakUser.name.split(' ')[1],
          email: keycloakUser.email
        }
      );
    });
  }

  logout(navigate) {
    this.oauthService.logOut();

    if (navigate) {
      this.util.navigateLogin();
    }

    this.storage.clear();
  }
}
