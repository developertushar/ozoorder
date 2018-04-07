import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { Component } from '@angular/core';



import {
   NavController,
   NavParams,
   AlertController,
   ToastController
   } from 'ionic-angular';

import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

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
    public firebasedb: AngularFireDatabase,
    public firebaseService: FirebaseServiceProvider,
    public firebaseAuth :AngularFireAuth

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



        const result = await this.firebaseService.setAuthentication(email,password,mobile,this.authority,username);


          if(result.uid)
          {
            const setToDatabase = await this.firebaseService.AddSignupDetails(username,email,mobile,authority);
            if(setToDatabase === true)
            {
              let alert = this.alertCtrl.create({
                title: 'OZO ORDER!',
                subTitle: 'Thank you so much for signing up for ' + authority,
                buttons: ['OK']
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
