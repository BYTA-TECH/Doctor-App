import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Util } from '../services/util';


export const authConfig: AuthConfig = {
    issuer: 'http://35.211.83.193:8099/auth/realms/Ayoos',
    redirectUri: window.location.origin,
    clientId: 'account',
    scope: 'openid profile email',
    dummyClientSecret: 'd5a6fa20-eb79-40b0-8193-a9370e2e7b44',
    tokenEndpoint: 'http://35.211.83.193:8099/auth/realms/Ayoos/protocol/openid-connect/token',
    userinfoEndpoint: 'http://35.211.83.193:8099/auth/realms/Ayoos/protocol/openid-connect/userinfo',
    oidc: false,
    requireHttps: false
};


@Injectable()
export class AuthGuardConfig {

    constructor(
        private oauthService: OAuthService,
        private util: Util
    ) {
        this.configureWithNewConfigApi();
    }

    private configureWithNewConfigApi() {

        this.oauthService.configure(authConfig);
        this.oauthService.setStorage(localStorage);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.loadDiscoveryDocumentAndTryLogin();


        // Optional
        this.oauthService.setupAutomaticSilentRefresh();

        this.oauthService.events.subscribe(e => {
          // tslint:disable-next-line:no-console
          console.debug('oauth/oidc event', e);
          if (e.type === 'silent_refresh_timeout') {
            this.util.navigateLogin();
          }
        });

        this.oauthService.events
          .pipe(filter(e => e.type === 'session_terminated'))
          .subscribe(e => {
            // tslint:disable-next-line: no-console
            console.debug('Your session has been terminated!');
          });

        this.oauthService.events
          .pipe(filter(e => e.type === 'token_received'))
          .subscribe(e => {
            // this.oauthService.loadUserProfile();
          });
    }
}
