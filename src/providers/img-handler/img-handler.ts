import { Injectable,NgZone  } from '@angular/core';
import 'firebase/database';
import firebase from 'firebase/app';
import 'firebase/auth';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { GooglePlus} from '@ionic-native/google-plus';

@Injectable()
export class ImgHandlerProvider {


afireauth:any;
nativepath: any;
firestore = firebase.storage();

constructor(private File:File,
  private filePath:FilePath,
  public filechooser:FileChooser,
  private googlePlus:GooglePlus) {
  console.log('Hello ImgHandlerProvider Provider');
}


uploadimage() {
      var promise = new Promise((resolve, reject) => {
          this.filechooser.open().then((url) => {
            (<any>window).FilePath.resolveNativePath(url, (result) => {
              this.nativepath = result;
              (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
                res.file((resFile) => {
                  var reader = new FileReader();
                  reader.readAsArrayBuffer(resFile);
                  reader.onloadend = (evt: any) => {
                    var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                    var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
                    imageStore.put(imgBlob).then((res) => {
                      this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
                        resolve(url);
                      }).catch((err) => {
                          reject(err);
                      })
                    }).catch((err) => {
                      reject(err);
                    })
                  }
                })
              })
            })
        })
      })
       return promise;
    
    }
  }