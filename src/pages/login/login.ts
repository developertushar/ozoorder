import { AngularFireList } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import {AngularFireDatabase} from 'angularfire2/database';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})


export class LoginPage {


  userDetails = [];

  constructor(
    public navCtrl: NavController,
    public firebaseService :FirebaseServiceProvider,
    public firebaseDb: AngularFireDatabase

  ) {



    // const data = this.firebaseDb.list('/userDetails/').valueChanges();
    // data.subscribe((getData)=>{

    //   getData.forEach((item)=>{

    //     console.log(item.email);


    //   })


    // });







  }




}
