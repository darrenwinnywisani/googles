import 'firebase/database';
import firebase, { User } from 'firebase/app';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {
  currentUser:User;
  userProfile: firebase.database.Reference
  constructor() {
    console.log('Hello ProfileProvider Provider');
  }
  updatePassword(newPassword:string,oldPassword:string):Promise<any>{
    const credentials: firebase.auth.AuthCredential=firebase.auth.EmailAuthProvider.
    credential(this.currentUser.email, oldPassword);
    return this.currentUser.reauthenticateWithCredential(credentials)
    .then(user => {
      this.currentUser.updatePassword(newPassword).then(user => {
        console.log('Password has been changed')
      })
    }).catch(error => {
      console.log(error);
    })
  }
  updateName(firstName:string, lastName: string):Promise<any> {
    return this.userProfile.update({ firstName, lastName })
  }
}
