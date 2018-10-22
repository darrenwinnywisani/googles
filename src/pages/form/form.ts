import { ImgHandlerProvider } from './../../providers/img-handler/img-handler';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { Alert, IonicPage, NavController, NavParams, AlertController,Loading,LoadingController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import {NgZone  } from '@angular/core';
import { GooglePlus} from '@ionic-native/google-plus'
import { ProfileProvider } from './../../providers/profile/profile';
@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {

  userProfile:any;
  private load:Loading;
email:string;
password:string;
  afireauth:any;
  fisrtName:string;
  LastName:string;
  bithdate:string;
 
 
  cornfirmation_password:string;
  
  imgurl = 'https://firebasestorage.googleapis.com/v0/b/registration-4c872.appspot.com/o/GBWA-20180730122133.jpg?alt=media&token=64f3d0f3-9464-49a0-bd11-fc8485b108a0https://firebasestorage.googleapis.com/v0/b/registration-4c872.appspot.com/o/GBWA-20180730122133.jpg?alt=media&token=64f3d0f3-9464-49a0-bd11-fc8485b108a0';moveon = true;
  
  
  constructor(public navCtrl: NavController,
    private proProvider: ProfileProvider,
     public navParams: NavParams,
     public alertCtrl:AlertController,
    public loadingCtrl:LoadingController,
    public zone:NgZone,
    private camera:Camera,
    private imagePicker:ImagePicker,
    private serviceAuth:AuthProvider,
    private imgService:ImgHandlerProvider) {
  }
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  
  signUp(){
   
    if(!this.email && !this.password ){
    console.log('Enter email address')
    }else{
      this.serviceAuth.signUp(this.email, this.password)
      .then(authData=>{
        this.load.dismiss().then(()=>{
  
      this.navCtrl.setRoot('LoginPage');
        })
      },error=>{
        this.load.dismiss().then(()=>{
          const alert :Alert = this.alertCtrl.create({
            message:error.message,
            buttons:[{text:'ok',role: 'cancel'}]
          })
          alert.present();
        })
      })
      this.load=this.loadingCtrl.create();
      this.load.present()
      }
      }
  image() {
        let loader = this.loadingCtrl.create({
          content: 'Please wait'
        })
        loader.present();
        this.imgService.uploadimage().then((uploadedurl: any) => {
          loader.dismiss();
          this.zone.run(() => {
            this.imgurl = uploadedurl;
            this.moveon = false;
          })
        })
      }
  
  
      updateimage() {
          let loader = this.loadingCtrl.create({
            content: 'Please wait'
          })
          loader.present();
          this.serviceAuth.updateimage(this.imgurl).then((res: any) => {
            loader.dismiss();
            if (res.success) {
              this.navCtrl.setRoot('TabsPage');
            }
            else {
              alert(res);
            }
          })
        }
        updateName(){
          const alert: Alert = this.alertCtrl.create({
            message: 'Your first name and last name',
            inputs:[{
              name:'firstName',
              placeholder:'Enter your first name',
              value:this.userProfile.firstName
            },{
              name:'lastName',
              placeholder:'Enter your lastName',
              value:this.userProfile.lastName
              
            }],
            buttons: [{
              text: 'cancel'
            },{
              text:'Save',
              handler: data =>{
                this.proProvider.updateName(data.firstName, data.lastName)
              }
            
            }]
          })
          alert.present()
          }
       
        logout(){
          this.navCtrl.push('LoginPage');
        }
  
  
  
  }
