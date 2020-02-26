import { GoogleMapsAPIWrapper, AgmCoreModule } from '@agm/core';
import { AuthInterceptor } from './configs/guards/auth-interceptor';
import { Util } from './services/util';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfigsModule } from './configs/configs.module';
// import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/file/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { LocationService } from './services/location.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
     OAuthModule.forRoot(),
     IonicModule.forRoot(),
     ConfigsModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      IonicStorageModule.forRoot({
        name: '__mydb',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
      }),
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDgCo5uoS1ziWYwxC_urPwZBIP-pO2geRY',
        libraries: ['places', 'geometry']
      }),
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
  providers: [
    GoogleMapsAPIWrapper,
    File,
    DocumentViewer,
    StatusBar,
    Util,
    SplashScreen,
    LocationService,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
