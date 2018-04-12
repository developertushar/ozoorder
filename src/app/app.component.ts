import { ServicesPage } from './../pages/services/services';
import { SplashPage } from './../pages/splash/splash';
import { HomePage } from './../pages/home/home';
import { Component, ViewChild ,OnInit} from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import {Storage} from '@ionic/storage';





//firebase
import {AngularFireAuth} from 'angularfire2/auth';




@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;

  //user authentication token to verify the process

  authenticationToken :boolean = false;

  rootPage: any;

  pages: Array<{title: string, component: any,authToken :boolean}>;

  constructor(
  public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public firebaseAuth :AngularFireAuth,
    public storage :Storage,
    public modal :ModalController

  ) {
    this.initializeApp();

    this.firebaseAuth.auth.onAuthStateChanged((user)=>{

      if(user)
      {

        this.authenticationToken = true;
        this.nav.setRoot(HomePage);

      }
      else
      {
        this.authenticationToken = false;
        this.nav.setRoot(LoginPage);


      }
    })

    // used for an example of ngFor and navigation


  }

  ngOnInit()
  {


    this.pages = [
      { title: 'Login', component: LoginPage, authToken: false },
      { title: 'Signup', component: SignupPage,authToken: false },
      { title: 'Services', component: ServicesPage,authToken: true },
      { title: 'Logout', component: LoginPage,authToken: true },

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      let splash = this.modal.create(SplashPage);
      splash.present();
      // this.splashScreen.hide();

  })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log();
    if(page.title == 'Logout') {
        this.firebaseAuth.auth.signOut();
        this.storage.clear();
        window.localStorage.clear();
        this.nav.setRoot(page.component);
    }
    else
    {
      this.nav.setRoot(page.component);
    }


  }
}
