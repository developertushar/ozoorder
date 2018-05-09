

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

  getData = [];

  user: string;

  signupToken :string;


  setRadioButton = [
    {typeButton: 'radio',labelName: 'PLANT',getValue: 'plant',checked: false },
    {typeButton: 'radio',labelName: 'REGIONAL MANAGER',getValue: 'regionalmanager',checked: true},
    {typeButton: 'radio',labelName: 'AREA SALES MANAGER',getValue: 'areasalesmanager',checked: false },
    {typeButton: 'radio',labelName: 'SALES OFFICER',getValue: 'salesofficer',checked: false },
    {typeButton: 'radio',labelName: 'PLANT',getValue: 'plant',checked: false },
  ]

  // ALL list of headquators


  headquators :any;


  constructor(
    public alertCtrl :AlertController,
    public toastCtrl: ToastController,
    public navCtrl :NavController,
    public firebasedb: AngularFireDatabase,
    public firebaseService: FirebaseServiceProvider,
    public firebaseAuth :AngularFireAuth,
    public loadCtrl :LoadingController,
    public firebaseDb :AngularFireDatabase,

  )
  {

    this.firebaseDb.list('/userDetails/').valueChanges().subscribe((data)=>{
      this.getData = data;
    })

    this.headquators = this.firebaseService.getTheHeadquators();
    console.log(this.headquators)

  }

  async signupCredentials(user,myForm)
  {

    console.log(user);

   this.signupToken = 'false';


    for(var index=0;index< this.getData.length;index++)
    {
      if(this.getData[index].username === user.username)
      {
        this.signupToken = 'true'
      }
    }

    if(this.signupToken === 'true')
    {

      const toast = this.toastCtrl.create({
        message: 'Username Existed try different one..',
        position: 'bottom',
        duration: 1500

      })

      toast.present();

    }
    else
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
        console.log(this.authority);

        this.getAuthenticated(user.email,user.password,user.username,user.headquator,this.authority);

      }
    });
    alert.present();

    }


  }



      async getAuthenticated(email :string,password: string,username :string,headquator :string,authority :string)
      {

        console.log(email + 'email');
        console.log(password + 'password');
        console.log(username + 'username');
        console.log(headquator + 'headquator');
        console.log(authority + 'authority');

        const load = this.loadCtrl.create({
          content: 'Signing you up...',
          spinner: 'dot',
          duration: 2000
        })

        load.present();

        const result = await  this.firebaseService.setAuthentication(email.toLowerCase(),password,authority,headquator,username);
         try{


            console.log(result);

          if(result.uid)
          {



            const setToDatabase = await this.firebaseService.AddSignupDetails(email.toLowerCase(),authority,headquator,username);
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
