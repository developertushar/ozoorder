import { ProductDetails } from '../modals/modal.productsDetails';
import { ServiceTrackOrderPage } from './../pages/service-track-order/service-track-order';
import { ServicePlaceOrderPage } from './../pages/service-place-order/service-place-order';
import { ServiceApprovalCheckPage } from './../pages/service-approval-check/service-approval-check';
import { ServicePastOrderPage } from './../pages/service-past-order/service-past-order';

import { ServicesPage } from './../pages/services/services';
import { HomePage } from '../pages/home/home';
import { FIREBASE_CONFIG } from './app.firebaseConfig';
// Main Modules
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, ModalController, NavParams, NavController } from 'ionic-angular';
import { MyApp } from './app.component';
import {IonicStorageModule} from '@ionic/storage';
import { SplashScreen  } from '@ionic-native/splash-screen';



// native plugins
import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SplashPage } from '../pages/splash/splash';
import {IntroPage} from '../pages/intro/intro';

//firebase
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { OrderDetailsProvider } from '../providers/order-details/order-details';

//interfaces



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    SplashPage,
    ServicesPage,
    ServicePastOrderPage,
    ServiceApprovalCheckPage,
    ServicePlaceOrderPage,
    ServiceTrackOrderPage,
    ProductDetails,
    IntroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    HttpClientModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    SplashPage,
    ServicesPage,
    ServicePastOrderPage,
    ServiceApprovalCheckPage,
    ServicePlaceOrderPage,
    ServiceTrackOrderPage,
    ProductDetails,
    IntroPage
  ],
  providers: [
    StatusBar,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServiceProvider,
    SplashScreen,
    Storage,
    DataServiceProvider,
    AuthServiceProvider,
    OrderDetailsProvider,
    ModalController,
  ]
})
export class AppModule {}
