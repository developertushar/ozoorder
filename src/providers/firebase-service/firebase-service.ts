import { HttpClient  } from '@angular/common/http';
import { Injectable, ViewChild , OnInit } from '@angular/core';
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
export class FirebaseServiceProvider implements OnInit {

  // allUserDetails = [];

  loginPage = LoginPage;


  //All about users
  alluserDetails = [];


  constructor(
    public http: HttpClient,
    public firebaseDb: AngularFireDatabase,
    public firebaseAuth: AngularFireAuth,
    public Toast: ToastController,
  ) {

  }

  ngOnInit()
  {

  }




  getUserDetails()
  {
    return this.firebaseDb.list('/userDetails/').valueChanges();


  }



  async setAuthentication(email :string,password :string,authority :string,headquator :string,username :string)
  {

    console.log(email);
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


  async AddSignupDetails(email :string,authority :string,headquator :string,username :string)
  {


    const emailId = email.substr(0,email.indexOf('@'));
    this.firebaseDb.list('/userDetails/').set(emailId,{
          username: username,
          email: email,
          authority: authority,
          headquator: headquator

    })

    return true;
    // return true;
  }


  getTheHeadquators()
  {
    var headquators = [
      {
        name: 'TELANGANA',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'WRANGAL&KARIMNAGAR',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'NEKKONDA',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'WARANGAL',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'KARIMNAGAR',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'JAMMIKUNTA',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'MAHABOOBABAD',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'NARSAMPETA',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'BHOOPALAPALLY',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'PARAKAL',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'ADILABAD & NIZAMABAD',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'ADILABAD',
        headquatorAddress: 'wg 422'
      },

      {
        name: 'MANCHIRYALA',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'BAINSA',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'GAJWEL',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'NIZAMABAD',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'KHAMMAM & NALGONDA',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'MAHABOOBNAGAR',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'MIRYALGUDA',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'NANDIGAMA',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'SURYAPAET',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'MYLAVARAM',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'KHAMMAM & LAKKAVARAM AND JGRG',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'KHAMMAM',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'BHADRACHALAM',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'WYRA',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'JANGAREDDYGUDEM AND LAKKAVARAM',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'ANDHARA PRADESH',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'NELLORE',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'NELLORE1',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'KAVALI2',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'MADHANAPALLY',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'SRIKALAHASTHI',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'KAVALI1',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'NAYUDUPETA',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'GUNTOOR',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'PIDUGURALA',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'DHARSI',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'R C PURAM',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'MANDAPETA',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'KATRENIKONA',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'PEDDAPURAM',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'WESTGODHAVARI',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'KURNOOL',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'MAHARASTRA',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'ODISHA & WESTBENGAL',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'WESTBENGAL',
        headquatorAddress: 'wg 422'
      },
      {
        name: 'ODISHA',
        headquatorAddress: 'wg 422'
      },
    ].sort();

    return headquators;

  }




}
