import { ServicesPage } from './../services/services';
import { HomePage } from './../home/home';
import { AngularFireList } from 'angularfire2/database';
import { Component , OnInit } from '@angular/core';
import { NavController, Platform, NavParams, ToastController, LoadingController } from 'ionic-angular';
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

          console.log(email);
          allUser.subscribe((data) => {
              this.alluserDetails = data;
              console.log(this.alluserDetails);

              for(var index=0;index < this.alluserDetails.length ; index++ )
              {
                if(this.alluserDetails[index].email === email)
                {

                  this.dataService.storeUserDetails(this.alluserDetails[index]);
                  window.localStorage.setItem('email',email);
                  const emailId = email.substr(0,email.indexOf('@')) + 'orders';
                  this.firebaseDb.list('/orderDetails/').set(emailId,'');
                  this.navCtrl.setRoot(ServicesPage,{email: email});


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
