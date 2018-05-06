import { ModifiedProductsPage } from './../../pages/modified-products/modified-products';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';


/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {

  products = [
    {
      name: 'Sarpanch',
      packageSize: ['4kg x 6','1kg x 10']
    },
    {
      name: 'Sarpanch Gold',
      packageSize: ['4kg x 6','1kg x 10']
    },
    {
      name: 'Hi - Result',
      packageSize: ['1000ml x 10','500ml x 20','250ml x 40']
    },
    {
      name: 'Effence',
      packageSize: ['1000ml x 10','500ml x 20','250ml x 40']
    },
    {
      name: 'Rambo',
      packageSize: ['1000ml x 10','500ml x 20','250ml x 40']
    },
    {
      name: 'Ozo More',
      packageSize: ['200ml x 20','100ml x 40']
    },
    {
      name: 'Super Lift',
      packageSize: ['50ml x 40','20mlx100']
    },
    {
      name: 'Micra',
      packageSize: ['400gm x 20']
    },
    {
      name: 'Ozo Power',
      packageSize: ['90gm x 20','45gm x 40','22.5gm x 80']
    },
    {
      name: 'Samrat',
      packageSize: ['100gm x 40']
    },
    {
      name: 'Zudo',
      packageSize: ['90ml x 40','45ml x 80']
    },
    {
      name: 'Supreme',
      packageSize: ['100ml x 50','1000ml x 10','500ml x 20','250ml x 40']
    },
    {
      name: 'Mega Polo',
      packageSize: ['150gm x 40']
    },
    {
      name: 'Ecopia',
      packageSize: ['1000ml x 10','500ml x 20','250ml x 40']
    },
    {
      name: 'Ozo Speed',
      packageSize: ['200ml x 20','100ml x 40','50ml x 80']
    },
    {
      name: 'Ozo - 9',
      packageSize: ['100ml x 20','50ml x 40','7ml x 100']
    },
    {
      name: 'Rio',
      packageSize: ['200gm x 20','100gm x 40','50gm x 80','10gm x 100']
    },
    {
      name: 'Focus',
      packageSize: ['1000ml x 10','500ml x 20','250ml x 40']
    },
    {
      name: 'Shine',
      packageSize: ['1000ml x 10','500ml x 20','250ml x 40']
    },
    {
      name: 'Ozo - Hero',
      packageSize: ['100ml+100gm x 20','50ml+50gm x 40']
    },
    {
      name: 'Mirakill',
      packageSize: ['500ml x 20','250ml x 40','125ml x 80']
    },
    {
      name: 'Tri Act',
      packageSize: ['100+100+100 x 20','50+50+50 x 40']
    },
    {
      name: 'Virtex',
      packageSize: ['100ml +100gm x 20','50ml +50gm x 40']
    },
    {
      name: 'Anti Virus',
      packageSize: ['100ml x 40','50ml x 80']
    },
    {
      name: 'Wilt Off',
      packageSize: ['500ml +500ml x 20']
    },
    {
      name: 'Ozo Grand',
      packageSize: ['200gm x 40','10gm x 100']
    },
    {
      name: 'Misky',
      packageSize: ['50gm x 40']
    },


  ].sort();



  orderSendForApproval = [];


  setRadioButton = [
    {typeButton: 'radio',labelName: 'Car',getValue: 'car',checked: false },
    {typeButton: 'radio',labelName: 'Bus',getValue: 'bus',checked: true},
    {typeButton: 'radio',labelName: 'Train',getValue: 'train',checked: false },
    {typeButton: 'radio',labelName: 'Bike',getValue: 'bike',checked: false },
  ]


  constructor(
    public actionCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public firebaseDb: AngularFireDatabase,
    public toast: ToastController,


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

  getProducts(){

    return this.products;
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
              actionSheet.addButton(data.productnames[i].name + ' | quantity: ' + data.productnames[i].quantity+'g' + '  |size: ' +data.productnames[i].size+'pkt');

              console.log(data.productnames[i]);


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
