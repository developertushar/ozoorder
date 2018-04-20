import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {

  orderSendForApproval = [];

  constructor(public http: HttpClient) {
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

}
