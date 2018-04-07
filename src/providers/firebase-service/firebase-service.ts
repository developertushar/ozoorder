import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {

  constructor(
    public http: HttpClient,
    public firebaseDb: AngularFireDatabase
  ) {
    console.log('Hello FirebaseServiceProvider Provider');
  }


  AddSignupDetails(username,email,phone,authority)
  {

    console.log(username,email,phone,authority);

    this.firebaseDb.list('/userDetails/').push({
          username: username,
          email: email,
          authority: authority,
          phoneNo: phone

    })


  }

}
