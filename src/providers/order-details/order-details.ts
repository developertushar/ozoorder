import { Observable } from 'rxjs/Observable';
import { ServicesPage } from './../../pages/services/services';

import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Injectable  } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import { Component , OnInit } from '@angular/core';
import { ToastController } from 'ionic-angular';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'

/*
  Generated class for the OrderDetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderDetailsProvider {

  constructor(
    public https: HttpClient,
    public firebaseDb: AngularFireDatabase,
    public toastCtrl : ToastController,
    public http : Http,

  ) {



  }


  SaveOrder(partyName,transportMedia,transportName,address,products,email,orderId)
  {

    // getting the date
    var date = new Date();
    const modifiedDate = date.toUTCString();
    const newModifiedDate = modifiedDate.substr(0,modifiedDate.indexOf('G'));



    const emailId = email.substr(0,email.indexOf('@')) + 'orders';
    const setTheData = {
      partyname : partyName,
      transportmedia: transportMedia,
      transportname: transportName,
      deliveryaddress: address,
      productnames: products,
      useremail: email,
      Orderid: orderId,
      placeDate: newModifiedDate
    };

    const set = this.http.post('https://ozoorderfinal.firebaseio.com/Orders/'+emailId+'.json' ,setTheData);
    set.subscribe(
      (response) =>{
          console.log(response);
      },
     (error) =>{

     }
    )




      if(set)
      {
        return true;
      }
      else
      {
        return false;
      }

  }

  createDatabase(email)
  {
    const emailId = email.substr(0,email.indexOf('@')) + 'orders';
    this.firebaseDb.list('/orderDetails/').set(emailId,'');
  }

  updateOrderDetails(partyName,transportMedia,transportName,address,products,email)
  {


    const details = this.firebaseDb.object('/orderDetails/');
    details.update({
      partyname : partyName,
      transportmedia: transportMedia,
      transportname: transportName,
      deliveryaddress: address,
      productnames: products,
      useremail: email
    });





  }

  getOrderDetails(emailId)
  {
    return this.http.get('https://ozoorderfinal.firebaseio.com/Orders/'+ emailId + '.json')
    .map(

      (response: Response)=> {
          const data = response.json();
          return data;
      },
      (error) =>{
          console.log(error);
      }
    );

  }


  deleteOrderDetails()
  {

  }


}
