import { SeeProductDetailsPage } from './../pages/see-product-details/see-product-details';
import { ModifiedProductsPage } from '../pages/modified-products/modified-products';

import { TabsPage } from './../pages/tabs/tabs';
import { PopoverPage } from './../pages/popover/popover';
import { ProductDetails } from '../modals/modal.productsDetails';

import { ServicesPage } from './../pages/services/services';
import { HomePage } from '../pages/home/home';
import { FIREBASE_CONFIG } from './app.firebaseConfig';
// Main Modules
import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule, ModalController, NavParams, NavController } from 'ionic-angular';
import { MyApp } from './app.component';
import {IonicStorageModule} from '@ionic/storage';
import { SplashScreen  } from '@ionic-native/splash-screen';



//animation
import { AnimationService, AnimatesDirective } from 'css-animator';



// native plugins
import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import {IntroPage} from '../pages/intro/intro';
import { ServicePastOrderPage } from './../pages/service-past-order/service-past-order';
import { ServiceTrackOrderPage } from './../pages/service-track-order/service-track-order';
import { ServicePlaceOrderPage } from './../pages/service-place-order/service-place-order';
import { ServiceApprovalCheckPage } from './../pages/service-approval-check/service-approval-check';


//firebase
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { OrderDetailsProvider } from '../providers/order-details/order-details';
import { SettingsPage } from '../pages/settings/settings';
import { SelectParty } from '../modals/selectParty/modal.selectparty';
import { SelectProducts } from '../modals/selectProducts/modal.selectproduct';

//interfaces



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    ServicesPage,
    ServicePastOrderPage,
    ServiceApprovalCheckPage,
    ServicePlaceOrderPage,
    ServiceTrackOrderPage,
    ProductDetails,
    IntroPage,
    PopoverPage,
    TabsPage,
    SettingsPage,
    SelectParty,
    SelectProducts,
    AnimatesDirective,
    ModifiedProductsPage,
    SeeProductDetailsPage


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    HttpModule,
    FormsModule,
    HttpClientModule,


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    ServicesPage,
    ServicePastOrderPage,
    ServiceApprovalCheckPage,
    ServicePlaceOrderPage,
    ServiceTrackOrderPage,
    ProductDetails,
    IntroPage,
    PopoverPage,
    TabsPage,
    SettingsPage,
    SelectParty,
    SelectProducts,
    ModifiedProductsPage,
    SeeProductDetailsPage
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
    AnimationService,
    HttpClientModule,

  ]
})
export class AppModule {}
