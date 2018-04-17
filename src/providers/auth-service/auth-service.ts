import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import { ToastController , Nav} from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

/*
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {


  alluserDetails = [];


  constructor(
    public http: HttpClient,
    public firebaseDb: AngularFireDatabase,
    public firebaseAuth: AngularFireAuth,
    public Toast: ToastController,
  ) {

  }



  getUserDetails()
  {
    return this.firebaseDb.list('/userDetails/').valueChanges();
  }






}
