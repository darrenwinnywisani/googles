import { ProfileProvider } from './../../providers/profile/profile';
import { Component } from '@angular/core';
import { Alert, AlertController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {
userProfile:any;
email:string;
birthDate:any;
  constructor(public navCtrl: NavController,
    private authProvider:AuthProvider, 
    public navParams: NavParams,
    private proProvider: ProfileProvider, 
    private alertCtrl: AlertController) {
  }
  resetPassword(){
    if(!this.email){
      console.log('enter email')
    }else{
      this.authProvider.resetPassword(this.email).then(user=>{
        const alert:Alert= this.alertCtrl.create({
          message:'Check your email for the reset password link',
          buttons:[{
            text:'ok',
            role:'cancel',
            handler:()=>{
              this.navCtrl.pop()
            }
          }]
        })
        alert.present()
      },error=>{
        const errorAlert=this.alertCtrl.create({
          message:error.message,
          buttons:[{
            text:'ok',
            role:'cancel'
          }]
        })
        errorAlert.present();
      }
    )
    }
  }
  
  
updatePassword(){
  const alert: Alert = this.alertCtrl.create({

    inputs: [{
      name:'oldPassword',
      placeholder: 'Enter old password',
      type: 'password'

    },{
      name:'newPassword',
      placeholder:'Enter your new password',
      type: 'password'

    }],
    buttons:[{
      text: 'cancel'
    },{
        text: 'Save',
        handler: data =>{
          this.proProvider.updatePassword(data.newPassword, data.oldPassword)
          .catch(err =>{
            console.log('Error message from catch:', err.message)
            let newAlert:Alert=this.alertCtrl.create({
              message:err.message
            })
            newAlert.present();
          })
        }
      
    }]
  
  })
  alert.present()
}
logOut(){
  this.navCtrl.push('LoginPage');
}

}