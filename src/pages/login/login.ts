import { TabsPage } from './../tabs/tabs';
import { SignupPage } from './../signup/signup';
import { ServicesPage } from './../services/services';
import { HomePage } from './../home/home';
import { AngularFireList } from 'angularfire2/database';
import { Component , OnInit } from '@angular/core';
import {App, NavController, Platform, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})


export class LoginPage  implements OnInit {
  signuppage = SignupPage

  gettingEmail :string;
  userDetails = [];



  alluserDetails = [];

  constructor(
    public navCtrl: NavController,
    public navParams :NavParams,
    public firebaseService :FirebaseServiceProvider,
    public firebaseDb: AngularFireDatabase,
    public firebaseAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    public loader :LoadingController,
    public dataService: DataServiceProvider,
    public appCtrl: App

  ) {  }


  ngOnInit()
  {

  }



  async loginToApp(email: string,password :string)
  {

    console.log('hi');

    const loader = this.loader.create({
      content: 'Signing you in...',
      spinner: 'dot',
      duration: 3000
    })

    loader.present();
    try
    {

      let result = await this.firebaseAuth.auth.signInWithEmailAndPassword(email,password);
      if(result.uid)
      {


        try{



          const allUser = this.firebaseService.getUserDetails();


          allUser.subscribe((data) => {
              this.alluserDetails = data;


              for(var index=0;index < this.alluserDetails.length ; index++ )
              {
                if(this.alluserDetails[index].email === email.toLowerCase())
                {

                  this.dataService.storeUserDetails(this.alluserDetails[index]);
                  const authority = this.alluserDetails[index].authority;
                  window.localStorage.setItem('email',email.toLowerCase());
                  window.localStorage.setItem('authority',authority);
                  const emailId = email.toLowerCase().substr(0,email.toLowerCase().indexOf('@')) + 'orders';
                  window.localStorage.setItem('orderEmail',emailId);
                  this.appCtrl.getRootNav().setRoot(TabsPage,{email: email,authority: authority,orderEmail :emailId });
                  loader.dismiss();
                  return false;
                }
              }
           })









        }
        catch(e)
        {
          const toast = this.toastCtrl.create({
            message: e,
            duration:1000,
            position: 'bottom'

          })

          toast.present();
        }
      }

    }
    catch(e)
    {


        const toast = this.toastCtrl.create({
          message: e.message,
          position:'bottom',
          duration: 1000
        });
        toast.present();




    }


  }


}
