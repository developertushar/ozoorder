
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

  async signupCredentials(username :string,email :string,password :string,confirmPassword :string,mobile :number)
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

        this.getAuthenticated(email,password,mobile ,this.authority,username );

      }
    });
    alert.present();

  }



      async getAuthenticated(email :string,password: string,mobile :number,authority :string,username :string )
      {


        const load = this.loadCtrl.create({
          content: 'Signing you up...',
          spinner: 'dot'
        })

        load.present();

        const result = await this.firebaseService.setAuthentication(email,password,mobile,this.authority,username);


          if(result.uid)
          {
            load.dismiss();
            const setToDatabase = await this.firebaseService.AddSignupDetails(username,email,mobile,authority);
            if(setToDatabase === true)
            {

              let alert = this.alertCtrl.create({
                title: 'OZO ORDER!',
                subTitle: 'Thank you so much for signing up for ' + authority,
                buttons: [{
                  text: 'Done',
                  handler: ()=>{
                    const loader = this.loadCtrl.create({
                      content:'Thank you..',
                      dismissOnPageChange: true,
                      spinner: 'dot'
                    })

                    loader.present();

                    //pushing to the Login Page
                    setTimeout(()=>{
                      this.navCtrl.setRoot(LoginPage);
                    },1000)

                  }

                }]

              });
              alert.present();






            }
            else
            {
              let alert = this.alertCtrl.create({
                title: 'NETWORK ERROR!',
                subTitle: 'Check you internet connection and try again' + authority,
                buttons: ['OK']
              });
              alert.present();
            }

          }




      }





}
