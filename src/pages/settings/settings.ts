import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  alluserDetails = [];
  showData =  [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseDb: FirebaseServiceProvider
  ) {



    const email = window.localStorage.getItem('email');
    const orderEmail = window.localStorage.getItem('orderEmail');
    const authority = window.localStorage.getItem('authority');

    const allUser = this.firebaseDb.getUserDetails();


    allUser.subscribe((data) => {
        this.alluserDetails = data;


        for(var index=0;index < this.alluserDetails.length ; index++ )
        {
          if(this.alluserDetails[index].email === email.toLowerCase())
          {
            this.showData.push({
              name: this.alluserDetails[index].username,
              authority: this.alluserDetails[index].authority,
              email: this.alluserDetails[index].email,
              phoneNo: this.alluserDetails[index].phoneNo,
            })

          }
        }
     })
  }

  ionViewDidLoad() {
    console.log(this.showData);


  }

}
