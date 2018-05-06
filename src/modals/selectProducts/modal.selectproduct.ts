import { DataServiceProvider } from './../../providers/data-service/data-service';
import { Storage } from '@ionic/storage';
import { OnInit, Component } from '@angular/core';
import { AlertController, ToastController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'modal-selectproduct',
  templateUrl: './modal.selectproduct.html'
})

export class SelectProducts implements OnInit{



  //new saved products
  getModifiedProductToken :string;
  products :any;
  newSaveProducts = [];
  newProducts = []
  newAddedProducts = [];
  setTokenforDuplicateAddingOfProduct :string;
  get :any;

  constructor(
    private alertCtrl :AlertController,
    private toastCtrl :ToastController,
    public localStorage: Storage,
    public loading: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: DataServiceProvider

  ) {

  //     set a key/value
  // window.localStorage.setItem('hey','hey');

  this.products = this.dataService.getProducts();

  // this.getModifiedProductToken = this.navParams.get('setToken');
  // console.log(this.getModifiedProductToken);
  // if(this.getModifiedProductToken)
  // {}


  }
  ngOnInit(){

  }



  selectProduct()
  {

    this.newSaveProducts = [];


    const product = this.alertCtrl.create();
    product.setTitle('Choose your products');

    for(var i=0;i< this.products.length ; i++)
    {


      product.addInput({
        type: 'checkbox',
          label: this.products[i].name,
          // value:  this.products[i].name
          value: JSON.stringify(this.products[i]),
        });

    }

    product.addButton({
      text: 'Select',
      handler: (data)=>{
        // const newData = JSON.parse(data);
        // this.newSaveProducts.pus  h(newData) ;
        this.newProducts = data;
        // console.log(this.newSaveProducts);
        for(var i=0; i< this.newProducts.length ; i++)
        {
          this.newSaveProducts.push(JSON.parse(this.newProducts[i]));

        }

        console.log(this.newSaveProducts);
      }
    })



    product.present();

  }


  getOrderProductDetails(product,size,selectItem)
  {


    this.setTokenforDuplicateAddingOfProduct = 'false';



    if(size == "")
    {
      const toast = this.toastCtrl.create({
        message: 'Please enter number of product count',
        duration: 1500,
        position:'bottom'
      })

      toast.present();
    }
    else
    {
        if(selectItem == "")
        {
          const toast = this.toastCtrl.create({
            message: 'Please select the packet size',
            duration: 1500,
            position:'bottom'

          })
          toast.present();
        }
        else
        {

          this.newAddedProducts.forEach((item)=>{
              if(item.productName == product)
              {
                const toast = this.toastCtrl.create({
                  message: 'Already Added',
                  position: 'top',
                  duration: 1500
                })
                toast.present();
                this.setTokenforDuplicateAddingOfProduct = 'true';
              }
          })
          if( this.setTokenforDuplicateAddingOfProduct === 'false' )
          {
            this.newAddedProducts.push({
              productName: product,
              size: size,
              quantity: selectItem
               })

               const toast = this.toastCtrl.create({
                 message: 'Added',
                 position: 'top',
                 duration: 1000
               })

               toast.present();
          }


        }

    }
   }





   deleteItem(item)
   {

    this.newAddedProducts.forEach((i)=>{
          if(i.productName == item.productName)
          {
            this.newAddedProducts.splice(i,1);
          }
    })
   }



   saveProducts()
   {


    // window.localStorage.clear();
    this.localStorage.remove('savedProducts');
    this.localStorage.set('savedProducts',JSON.stringify(this.newAddedProducts));

    const loader = this.loading.create({
      content: 'Successfully saved',
      duration: 1500

    })

    loader.present();

    this.navCtrl.pop();





   }


  }
