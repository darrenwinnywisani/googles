
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { Alert,IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import 'firebase/database';
import firebase from 'firebase/app';
import 'firebase/auth';
import { GooglePlus} from '@ionic-native/google-plus'


@IonicPage()
@Component({
selector: 'page-login',
templateUrl: 'login.html',
})
export class LoginPage {
private load:Loading;
email:string;
password:string;

constructor(public navCtrl: NavController,
  private loadingCTR: LoadingController, 
  public navParams: NavParams,
   public alertCtrl:AlertController,
   public loadCtrl:LoadingController,
   private serviceAuth:AuthProvider ,
   private googlePlus:GooglePlus) {


   }

ionViewDidLoad() {
  console.log('ionViewDidLoad LoginPage');
}
goToSignUp():void {
  this.navCtrl.push('SignUpPage');
}
Google(){

    let loader = this.loadingCTR.create({
      content: 'Please wait'
    })
  this.googlePlus.login({
    'webClientId':'223180168931-94at127sckco7ktiqnc16l9ps5oggmfl.apps.googleusercontent.com',
    'offline':true
  }).then(res=>{
    firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(suc=>{
      loader.dismiss();
      alert("Login success");
      this.navCtrl.setRoot('FormPage');
    }).catch(ns=>{
      loader.dismiss();
      alert("Not success")
    })
  })

}
signIn(){
  
  if(!this.email && !this.password){

      }
      else{
        this.serviceAuth.signIn(this.email,this.password).then(authData=>{
          this.load.dismiss().then(()=>{

            this.navCtrl.setRoot('FormPage');
          })
        },error=>{
           this.load.dismiss().then(()=>{
         const alert :Alert =this.alertCtrl.create({
           message:error.message,
           buttons:[{ text:'ok',role:'cancel'}]
         })
         alert.present()
        })
    })
     this.load=this.loadCtrl.create();
     this.load.present()
      }
 }


 forgetPassword(){
  this.navCtrl.setRoot('ResetPage');

} 





}
