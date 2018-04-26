import { Storage } from '@ionic/storage';
import { OnInit, Component } from '@angular/core';
import { AlertController, ToastController, LoadingController, NavController } from 'ionic-angular';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'modal-selectproduct',
  templateUrl: './modal.selectproduct.html'
})

export class SelectProducts implements OnInit{

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


  ]

  //new saved products
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
    public navCtrl: NavController

  ) {

  //     set a key/value
  // window.localStorage.setItem('hey','hey');



  // console.log(window.localStorage.getItem('hey'));

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
