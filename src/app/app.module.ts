import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { GooglePlus} from '@ionic-native/google-plus';
import { ImgHandlerProvider } from '../providers/img-handler/img-handler';
import * as firebase from 'firebase'
import {AngularFireModule} from 'angularfire2';
import { ProfileProvider } from '../providers/profile/profile';

export const  config = {

  apiKey: "AIzaSyCHFbTgR0jbAVrTXIWvdX-AvIspabj6MqQ",
  authDomain: "registration-4c872.firebaseapp.com",
  databaseURL: "https://registration-4c872.firebaseio.com",
  projectId: "registration-4c872",
  storageBucket: "registration-4c872.appspot.com",
  messagingSenderId: "223180168931"

};

firebase.initializeApp(config);

@NgModule({
declarations: [
  MyApp,
  HomePage
],
imports: [
  BrowserModule,
  IonicModule.forRoot(MyApp),
  AngularFireModule.initializeApp(config)
],
bootstrap: [IonicApp],
entryComponents: [
  MyApp,
  HomePage
],
providers: [
  StatusBar,
  SplashScreen,
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  AuthProvider,
  Camera,
  ImagePicker,
  File,
  FileChooser,
  FilePath,
  GooglePlus,
  ImgHandlerProvider,
  AngularFireModule,
    ProfileProvider,
]
})
export class AppModule {}
