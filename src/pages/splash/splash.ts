import { LoginPage } from './../login/login';
import { IntroPage } from './../intro/intro';
import { Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {
 splashToken :string;


  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
      public splashScreen: SplashScreen,
      public viewCtrl: ViewController,
    public appCtrl: App) {
  }

  ionViewDidLoad() {


    this.splashToken = window.localStorage.getItem('splashToken');

    console.log(this.splashToken + 'splashToken');

    setTimeout(() => {
      this.viewCtrl.dismiss();

      if(this.splashToken != 'true')
      {

        this.appCtrl.getRootNav().setRoot(IntroPage);

      }



    }, 4000);
  }

}
