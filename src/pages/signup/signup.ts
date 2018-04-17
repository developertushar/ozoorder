
import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { Component, ViewChild } from '@angular/core';




import {
   NavController,
   NavParams,
   AlertController,
   ToastController,
   LoadingController

   } from 'ionic-angular';

import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  authority :string;



  setRadioButton = [
    {typeButton: 'radio',labelName: 'General Manager',getValue: 'generalmanager',checked: true},
    {typeButton: 'radio',labelName: 'Team Leader',getValue: 'teamleader',checked: false },
    {typeButton: 'radio',labelName: 'Field Officer',getValue: 'fieldofficer',checked: false },
    {typeButton: 'radio',labelName: 'Distict Manager',getValue: 'districtmanager',checked: false },
  ]

  constructor(
    public alertCtrl :AlertController,
    public toastCtrl: ToastController,
    public navCtrl :NavController,
    public firebasedb: AngularFireDatabase,
    public firebaseService: FirebaseServiceProvider,
    public firebaseAuth :AngularFireAuth,
    public loadCtrl :LoadingController

  )
  {



  }

  async signupCredentials(user,myForm)
  {




    const alert = this.alertCtrl.create();
    alert.setTitle('Choose the Authorisation');

    for(var i=0; i<this.setRadioButton.length;i++)
    {
      alert.addInput({
        type: this.setRadioButton[i].typeButton,
        label: this.setRadioButton[i].labelName,
        value: this.setRadioButton[i].getValue,
        checked: this.setRadioButton[i].checked
      });

    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {


        this.authority = data;

        this.getAuthenticated(user.email,user.password,user.mobile ,this.authority,user.username );

      }
    });
    alert.present();

  }



      async getAuthenticated(email :string,password: string,mobile :number,authority :string,username :string )
      {


        const load = this.loadCtrl.create({
          content: 'Signing you up...',
          spinner: 'dot',
          duration: 2000
        })

        load.present();

        const result = await  this.firebaseService.setAuthentication(email,password,mobile,this.authority,username);

         try{




          if(result.uid)
          {



            const setToDatabase = await this.firebaseService.AddSignupDetails(username,email,mobile,authority);
            if(setToDatabase === true)
            {
              load.dismiss();
              let alert = this.alertCtrl.create({
                title: 'OZO ORDER!',
                subTitle: 'Thank you so much for signing up for ' + authority,
                 buttons: [{
                   text: 'ok',
                   handler: () =>{

                    // this.navCtrl.push(LoginPage);
                   }
                 }]

              });
              this.firebaseAuth.auth.signOut();
              alert.present();


              //fix for that



              return false;






            }
            else
            {
              load.dismiss();
              let alert = this.alertCtrl.create({
                title: 'NETWORK ERROR!',
                subTitle: 'Check you internet connection and try again' + authority,
                buttons: ['OK']
              });
              alert.present();

            }

          }

         }
         catch(e)
         {

          let alert = this.alertCtrl.create({
            title: e,
            buttons: ['OK']
          });
          alert.present();

         }





      }





}
