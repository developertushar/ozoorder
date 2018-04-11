import { HomePage } from './../home/home';
import { AngularFireList } from 'angularfire2/database';
import { Component , OnInit } from '@angular/core';
import { NavController, Platform, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})


export class LoginPage  implements OnInit {

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
    public loader :LoadingController

  ) {  }


  ngOnInit()
  {

  }



  async loginToApp(email: string,password :string)
  {


    try
    {
      let result = await this.firebaseAuth.auth.signInWithEmailAndPassword(email,password);

      if(result.uid)
      {
        const loader = this.loader.create({
          content: 'Signing you in...',
          spinner: 'dot',
          duration: 1000
        })

        loader.present();

        try{



          const allUser = this.firebaseService.getUserDetails();
          allUser.subscribe((data) => {
              this.alluserDetails = data;

              for(var index=0;index < this.alluserDetails.length ; index++ )
              {
                if(this.alluserDetails[index].email === email)
                {
                  this.navCtrl.setRoot(HomePage);

                  // window.localStorage.setItem('token',email);


                }
              }
           })









        }
        catch(e)
        {

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
