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

  //pending keys arrays
  pendingKeys = [];

  constructor(
    public https: HttpClient,
    public firebaseDb: AngularFireDatabase,
    public toastCtrl : ToastController,
    public http : Http,

  ) {



  }


  SaveOrder(partyName,transportMedia,transportName,customerName,customerMobile,address,products,orderId,authority,email)
  {


    var date = new Date();
    const modifiedDate = date.toUTCString();



    const emailId = email.substr(0,email.indexOf('@')) + 'orders';
    const userName = email.substr(0,email.indexOf('@'));
    const setTheData = {
      Headquator : partyName,
      transportmedia: transportMedia,
      transportname: transportName,
      deliveryaddress: address,
      productnames: products,
      useremail: email,
      Orderid: orderId,
      placeDate: modifiedDate,
      approvalAuthority: '',
      isApproved: '',
      approveTime: '',
      deliveryTime: '',
      customername: customerName,
      customermobile: customerMobile,
      sendTo: '',
      OrderKey: '',
      sendBy: email,
      username: userName,
      authority: authority
    };

    const pendingData = {
      Headquator : partyName,
      transportmedia: transportMedia,
      transportname: transportName,
      deliveryaddress: address,
      productnames: products,
      useremail: email,
      Orderid: orderId,
      approvalAuthority: '',
      placeDate: modifiedDate,
      isApproved: '',
      approveTime: '',
      deliveryTime: '',
      customername: customerName,
      customermobile: customerMobile,
      sendTo: '',
      OrderKey: '',
      sendBy: email,
      isModified: '',
      isModifiedBy: '',
      authority: authority,
      isApprovedBy: ''
    }

    const set = this.firebaseDb.list('/Orders/'+emailId).push(setTheData).then((item)=>{

      this.firebaseDb.list('/Orders/'+emailId).update(item.key,{
        OrderKey: item.key
      })

    });

    const pending = this.firebaseDb.list('/pendingOrder/').push(pendingData).then((item)=>{


      this.firebaseDb.list('/pendingOrder/').update(item.key,{
        OrderKey: item.key
      })

    });

      if(set && pending)
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

  getUserDetails()
  {
    return this.firebaseDb.list('/userDetails/').valueChanges();
  }


  storeKeysOfPendingOrders(email,Orderid,key){

    this.pendingKeys.push({
      email: email,
      orderId:Orderid,
      OrderKey: key
    })

    console.log(this.pendingKeys);



  }


  getUserName(email)
  {
    const userName = email.substr(0,email.indexOf('@'));
    return userName;

  }



}
