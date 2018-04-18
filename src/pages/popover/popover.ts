import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { App,IonicPage, NavController, NavParams, LoadingController , ViewController} from 'ionic-angular';
import {AngularFireAuth } from 'angularfire2/auth';


/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public firebaseAuth: AngularFireAuth,
     public load: LoadingController,
     public appCtrl: App,
     public viewCtrl: ViewController,

  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  logout()
  {

    const loader = this.load.create({
      content: 'Logging out',
      spinner: 'dot',
      duration: 3000
    })

    loader.present();
    this.firebaseAuth.auth.signOut();
    window.localStorage.clear();
    loader.dismiss();
    this.appCtrl.getRootNav().setRoot(LoginPage);
    this.viewCtrl.dismiss();



  }
}
