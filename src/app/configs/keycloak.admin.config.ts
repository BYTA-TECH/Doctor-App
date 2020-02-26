import { KeycloakAdminClient } from 'keycloak-admin/lib/client';
import { Injectable } from '@angular/core';


@Injectable()
export class KeycloakAdminConfig {


    kcAdminClient: KeycloakAdminClient;

    constructor() {
      this.kcAdminClient = new KeycloakAdminClient();
      this.kcAdminClient.setConfig({
        baseUrl: ' http://35.211.83.193:8099/auth'
      });
      this.configureKeycloakAdmin();
    }

    refreshClient() {
      return this.configureKeycloakAdmin();
    }

    configureKeycloakAdmin() {
     return  this.kcAdminClient.auth({
      username: 'admin',
      password: 'admin',
      grantType: 'password',
      clientId: 'admin-cli',
     // clientSecret: 'd5a6fa20-eb79-40b0-8193-a9370e2e7b44'
      });
    }
}