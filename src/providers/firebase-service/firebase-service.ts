import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import { ToastController , Nav} from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {


  loginPage = LoginPage;

  constructor(
    public http: HttpClient,
    public firebaseDb: AngularFireDatabase,
    public firebaseAuth: AngularFireAuth,
    public Toast: ToastController,
  ) {
    console.log('Hello FirebaseServiceProvider Provider');
  }


  getUserDetails()
  {
    return  this.firebaseDb.list('/userDetails/').valueChanges();


  }



  async setAuthentication(email :string,password :string,mobile :number,authority :string,username :string)
  {

    try{
         let result = await this.firebaseAuth.auth.createUserWithEmailAndPassword(email,password);
          return {uid: result.uid,email: result.email}

    }
    catch(e)
    {

      const toast = this.Toast.create({
        message: e.message,
        position:'bottom',
        duration: 1000
      });
      toast.present();
      return e;

    }



  }


  async AddSignupDetails(username,email,phone,authority)
  {



    this.firebaseDb.list('/userDetails/').push({
          username: username,
          email: email,
          authority: authority,
          phoneNo: phone
    })


    return true;




    // return true;
  }

}
