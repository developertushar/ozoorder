import { DataServiceProvider } from './../../providers/data-service/data-service';
import { Storage } from '@ionic/storage';
import { SelectProducts } from './../../modals/selectProducts/modal.selectproduct';
import { TabsPage } from './../tabs/tabs';
import { ServicesPage } from './../services/services';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { OrderDetailsProvider } from '../../providers/order-details/order-details';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the SeeProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-see-product-details',
  templateUrl: 'see-product-details.html',
})
export class SeeProductDetailsPage {

  appCtrl: any;
  orderId :any;
  email :any;
  userDetails = [];
  authority :string;
  orderEmail: string
  totalAmount: number = 0;
  getProductDetails = [];

  products = [] ;
  newAddress :string;
  code;

  customername :any;
  customermobile :any;

  noProducts :string;
  newAddedProducts = [];
  setTokenforDuplicateAddingOfProduct :string;

  transportmedia = [
    {type: 'radio',label: 'Car',value: 'car',checked: false},
    {type: 'radio',label: 'Bus',value: 'bus',checked: false},
    {type: 'radio',label: 'Train',value: 'train',checked: false},
    {type: 'radio',label: 'Bike',value: 'bike',checked: false},

  ]

  headquators = [];
  newSaveProducts = [] ;
  newProducts = [];

  items;

  alluserDetails = [];
  constructor(
    public navParams :NavParams,
    public navCtrl: NavController,
    public orderDetailService: OrderDetailsProvider,
    public firebaseDb: AngularFireDatabase,
    public firebaseService: FirebaseServiceProvider,
    public loader: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public localStorage: Storage,
    public dataService: DataServiceProvider,


  ) {


    this.noProducts = 'false';
    this.products = this.dataService.getProducts();


    this.getProductDetails.push(this.navParams.get('Products'));
    console.log(this.getProductDetails);


    this.headquators = this.firebaseService.getTheHeadquators();





  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeeProductDetailsPage');
  }


  closeModal()
  {


    this.navCtrl.pop();


  }

  placeOrder()
  {
   // firebase database of orderDetail

   this.appCtrl.getRootNav().setRoot(TabsPage,{email: this.email,authority: this.authority,orderEmail: this.orderEmail});




  }




    ModifyDetails(caseSwitch,value,item)
    {

        switch (caseSwitch) {

          case 'headquator':
                // case start
              let alert1 = this.alertCtrl.create();
              alert1.setTitle('Select New Headquator');

              for(var i=0;i<this.headquators.length ; i++)
              {
               alert1.addInput({
                 type: 'radio',
                 label:  this.headquators[i].name,
                 value:  this.headquators[i].name,
                 checked:  false
               });
              }

             alert1.addButton({
               text: 'Update',
               handler: (getData)=>{
                 console.log(getData.toLowerCase());

                   for(var i=0;i<this.getProductDetails.length ; i++)
                   {
                      if(this.getProductDetails[i].Headquator === value)
                      {
                          this.getProductDetails[i].Headquator = getData;
                          const toast = this.toastCtrl.create({
                            message: 'Successfully Updated',
                            position: 'bottom',
                            duration: 1000
                          })
                          toast.present();
                      }
                   }
               }
             })

              alert1.present();
              break;

              // case end
         case 'transportmediatype':
              let alert = this.alertCtrl.create();
              alert.setTitle('Enter new Transport type');

              for(var index=0;index<this.transportmedia.length ; index++)
              {
               alert.addInput({
                 type: this.transportmedia[index].type,
                 label:  this.transportmedia[index].label,
                 value:  this.transportmedia[index].value,
                 checked:  this.transportmedia[index].checked
               });
              }

             alert.addButton({
               text: 'Update',
               handler: (getData)=>{
                 console.log(getData);

                 for(var i=0;i<this.getProductDetails.length ; i++)
                 {
                    if(this.getProductDetails[i].transportmedia === value)
                    {
                        this.getProductDetails[i].transportmedia = getData;
                        const toast = this.toastCtrl.create({
                          message: 'Successfully Updated',
                          position: 'bottom',
                          duration: 1000
                        })
                        toast.present();
                    }
                 }
                //  this.firebaseDb.list('/pendingOrder/').update(item.OrderKey,{
                //   transportmedia: getData
                // }).then(()=>{
                //   const toast = this.toastCtrl.create({
                //     message: 'Transport Media Updated ',
                //     position: 'top',
                //     duration:1000
                //   });
                //   toast.present();
                // })

               }
             })

              alert.present();


              break;

           case "transportname":
            let prompt1 = this.alertCtrl.create({
              title: 'Transport Name',
              message: "Enter new transport name",
              inputs: [
                {
                  name: 'transportname',

                },
              ],
              buttons: [
                {
                  text: 'Cancel',
                  handler: data => {
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: 'update',
                  handler: (getData) => {
                    console.log(getData.transportname);

                 for(var i=0;i<this.getProductDetails.length ; i++)
                 {
                    if(this.getProductDetails[i].transportname === value)
                    {
                        this.getProductDetails[i].transportname = getData.transportname;
                        const toast = this.toastCtrl.create({
                          message: 'Successfully Updated',
                          position: 'bottom',
                          duration: 1000
                        })
                        toast.present();
                    }
                 }
                    // this.firebaseDb.list('/pendingOrder/').update(item.OrderKey,{
                    //   transportname: getData.transportname
                    // }).then(()=>{
                    //   const toast = this.toastCtrl.create({
                    //     message: 'Transport Media Updated',
                    //     position: 'top',
                    //     duration:1000
                    //   });
                    //   toast.present();
                    // })
                  }
                }
              ]
            });
            prompt1.present();
                  break;

            case "customername":
                  let prompt2 = this.alertCtrl.create({
                    title: 'Enter the new Customer name',
                    message: "Enter new transport name",
                    inputs: [
                      {
                        name: 'customername',

                      },
                    ],
                    buttons: [
                      {
                        text: 'Cancel',
                        handler: data => {
                          console.log('Cancel clicked');
                        }
                      },
                      {
                        text: 'update',
                        handler: (getData) => {
                          console.log(getData.customername);

                       for(var i=0;i<this.getProductDetails.length ; i++)
                       {
                          if(this.getProductDetails[i].customername === value)
                          {
                              this.getProductDetails[i].customername = getData.customername;
                              const toast = this.toastCtrl.create({
                                message: 'Successfully Updated',
                                position: 'bottom',
                                duration: 1000
                              })
                              toast.present();
                          }
                       }
                          // this.firebaseDb.list('/pendingOrder/').update(item.OrderKey,{
                          //   transportname: getData.transportname
                          // }).then(()=>{
                          //   const toast = this.toastCtrl.create({
                          //     message: 'Transport Media Updated',
                          //     position: 'top',
                          //     duration:1000
                          //   });
                          //   toast.present();
                          // })
                        }
                      }
                    ]
                  });
                  prompt2.present();
                        break;

                        case "customermobile":
                        let prompt3 = this.alertCtrl.create({
                          title: 'Transport Name',
                          message: "Enter  Customer new Mobile number",
                          inputs: [
                            {
                              name: 'customermobile',

                            },
                          ],
                          buttons: [
                            {
                              text: 'Cancel',
                              handler: data => {
                                console.log('Cancel clicked');
                              }
                            },
                            {
                              text: 'update',
                              handler: (getData) => {
                                console.log(getData.customermobile);

                             for(var i=0;i<this.getProductDetails.length ; i++)
                             {
                                if(this.getProductDetails[i].customermobile === value)
                                {
                                    this.getProductDetails[i].customermobile = getData.customermobile;
                                    const toast = this.toastCtrl.create({
                                      message: 'Successfully Updated',
                                      position: 'bottom',
                                      duration: 1000
                                    })
                                    toast.present();
                                }
                             }
                                // this.firebaseDb.list('/pendingOrder/').update(item.OrderKey,{
                                //   transportname: getData.transportname
                                // }).then(()=>{
                                //   const toast = this.toastCtrl.create({
                                //     message: 'Transport Media Updated',
                                //     position: 'top',
                                //     duration:1000
                                //   });
                                //   toast.present();
                                // })
                              }
                            }
                          ]
                        });
                        prompt3.present();
                              break;
                              case "deliveryaddress":
                              let prompt4 = this.alertCtrl.create({
                                title: 'Transport Name',
                                message: "Enter  Customer new Mobile number",
                                inputs: [
                                  {
                                    name: 'deliveryaddress',

                                  },
                                ],
                                buttons: [
                                  {
                                    text: 'Cancel',
                                    handler: data => {
                                      console.log('Cancel clicked');
                                    }
                                  },
                                  {
                                    text: 'update',
                                    handler: (getData) => {
                                      console.log(getData.deliveryaddress);

                                   for(var i=0;i<this.getProductDetails.length ; i++)
                                   {
                                      if(this.getProductDetails[i].deliveryaddress === value)
                                      {
                                          this.getProductDetails[i].deliveryaddress = getData.deliveryaddress;
                                          const toast = this.toastCtrl.create({
                                            message: 'Successfully Updated',
                                            position: 'bottom',
                                            duration: 1000
                                          })
                                          toast.present();
                                      }
                                   }
                                      // this.firebaseDb.list('/pendingOrder/').update(item.OrderKey,{
                                      //   transportname: getData.transportname
                                      // }).then(()=>{
                                      //   const toast = this.toastCtrl.create({
                                      //     message: 'Transport Media Updated',
                                      //     position: 'top',
                                      //     duration:1000
                                      //   });
                                      //   toast.present();
                                      // })
                                    }
                                  }
                                ]
                              });
                              prompt4.present();
                                    break;

          } //switch end


    } //function end


    changeProduct()
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


      console.log(this.newSaveProducts);


      product.present();

    }



      getOrderProductDetails(product,size,selectItem,items)
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


                items.productnames.push({
                  name: product,
                    size: size,
                    quantity: selectItem
                });

                console.log(items.productnames);


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



       updateAllDetails()
       {

       }






  }



