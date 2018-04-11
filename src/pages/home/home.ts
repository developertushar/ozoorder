import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import {DataServiceProvider} from '../../providers/data-service/data-service';

import { Component ,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  alluserDetails = [];

  getCurrentUserDetails = [];

  username :string;
  email :string;
  authority: string;



  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public dataService: DataServiceProvider,
     public authenService :AuthServiceProvider


    ) {


  }

  ionViewWillLoad() {



  }

  ngOnInit()
  {

    console.log(window.localStorage.getItem('email'));
    const email = window.localStorage.getItem('email');
    const getData = this.authenService.getUserDetails();
    getData.subscribe((data)=>{
     this.alluserDetails = data;

     for(var index=0;index < this.alluserDetails.length ; index++ )
     {
       if(this.alluserDetails[index].email === email)
       {

        this.getCurrentUserDetails.push(this.alluserDetails[index]);
        this.username = this.getCurrentUserDetails[index].username;
        this.email = this.getCurrentUserDetails[index].email;
        this.authority = this.getCurrentUserDetails[index].authority;

       }
     }
    })

  }


  getDetail()
  {



  }

}
