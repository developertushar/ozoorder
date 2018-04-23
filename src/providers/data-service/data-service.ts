import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ActionSheetController} from 'ionic-angular';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {

  orderSendForApproval = [];

  constructor(
    public http: HttpClient,
    public actionCtrl: ActionSheetController,

  ) {
    console.log('Hello DataServiceProvider Provider');
  }


  storeUserDetails(gettingData)
  {

    console.log(gettingData.email);
    console.log(gettingData.email+ 'under storage Details');
     window.localStorage.setItem('email',gettingData.email);

  }

  saveApprovalRecords(productData)
  {

    this.orderSendForApproval.push({
      email: productData.email,
      orderid: productData.orderid,

    })

    console.log(this.orderSendForApproval);
  }


  cardClickDetails(data)
  {


    const actionSheet1 = this.actionCtrl.create({
      title: 'Details',
      buttons: [
        {
          text: 'Products',
          handler: ()=>{
            const actionSheet = this.actionCtrl.create();
            for(var i=0;i < data.productnames.length ; i++)
            {
              actionSheet.addButton(data.productnames[i].name);
              // console.log(products[i].name);

            }
            actionSheet.addButton('Cancel');


            actionSheet.present();
          }
        },
        {
          text: 'Transport Media',
          handler: () =>
          {
            const actionSheet = this.actionCtrl.create();
            actionSheet.setTitle(data.transportmedia)
            actionSheet.addButton('Cancel');


            actionSheet.present();


          }
        },
        {
          text: 'Transport Name',
          handler: () =>
          {
            const actionSheet = this.actionCtrl.create();
            actionSheet.setTitle(data.transportname);
            actionSheet.addButton('Cancel');
            actionSheet.present();

          }
        },
        {
          text: 'Address',
          handler: () =>
          {
            const actionSheet = this.actionCtrl.create();
            actionSheet.setTitle(data.deliveryaddress);
            actionSheet.addButton('Cancel');
            actionSheet.present();

          }
        }
      ]
    })

    actionSheet1.present();
  }

}
