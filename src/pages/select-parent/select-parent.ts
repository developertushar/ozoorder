import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the SelectParentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-parent',
  templateUrl: 'select-parent.html',
})
export class SelectParentPage {


  teamLeaders :any;
  districtmanagers :any;
  setToken: string;
  clicked :string;
  changeclick = 'Select';
  changeOnclick :any;
  setLeader: string;



  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public loader: LoadingController,
     public Toast : ToastController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectParentPage');

    // this.clicked = window.localStorage.getItem('selectApprovalAuthority');
    if(window.localStorage.getItem('selectApprovalAuthorityLeader') != null || window.localStorage.getItem('selectApprovalAuthorityLeader') != undefined)
    {

      this.setLeader = window.localStorage.getItem('selectApprovalAuthorityLeader');
      console.log(this.setLeader + 'getting name in the if loop');
      this.changeOnclick = 'Selected';
      this.changeOnclick = 'Select';

    }

    if(window.localStorage.getItem('selectApprovalAuthorityManager') != null || window.localStorage.getItem('selectApprovalAuthorityManager') != undefined)
    {

      this.setLeader = window.localStorage.getItem('selectApprovalAuthorityManager');
      console.log(this.setLeader + 'getting name in the if loop');
      this.changeOnclick = 'Selected';
      this.changeOnclick = 'Select';

    }


    const load = this.loader.create({
      content: 'Fetching data Please wait'
    })
    load.present();
    this.teamLeaders = this.navParams.get('leaders');
    this.districtmanagers = this.navParams.get('districtManagers');
    this.setToken = this.navParams.get('setToken');

    console.log('getting the leader'+ this.teamLeaders);
    console.log('getting the district'+ this.districtmanagers);
    console.log('getting the tokenmame'+ this.setToken);
    setTimeout(() => {
      load.dismiss();

    }, 2000);


  }

  buttonClickedForLeaders(name,id)
  {
    window.localStorage.removeItem('selectApprovalAuthorityLeader');
    console.log(name);

    this.teamLeaders.forEach((leaders)=>{
      if(leaders.teamLeaderUsername == name)
      {

        window.localStorage.setItem('selectApprovalAuthorityLeader',name);
        this.changeOnclick = 'Selected';
        this.navCtrl.pop();
        const toast = this.Toast.create({
          message: 'Selected Successfully',
          duration: 1000
        })
        toast.present();

      }

    })
  }

  buttonClickedForManagers(name,id)
  {
    window.localStorage.removeItem('selectApprovalAuthorityManager');
    console.log(name);

    this.districtmanagers.forEach((managers)=>{
      if(managers.districtManagerName == name)
      {

        window.localStorage.setItem('selectApprovalAuthorityManager',name);;
        this.navCtrl.pop();
        const toast = this.Toast.create({
          message: 'Selected Successfully',
          duration: 1000
        })
        toast.present();

      }

    })
  }



}
