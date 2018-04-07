import { AngularFireList } from 'angularfire2/database';
import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})


export class LoginPage {

  items: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public firebaseService :FirebaseServiceProvider,
    public firebaseDb: AngularFireDatabase

  ) {





    console.log(this.items);




  }




}
