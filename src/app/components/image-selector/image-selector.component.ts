import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss'],
})
export class ImageSelectorComponent implements OnInit {

  fileToUpload: File;
  fileUrl = './assets/picture.svg';

  constructor(
    // private camera: Camera,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  startFileUploadHtmlDialog() {
    document.getElementById('fileUpload').click();

  }
  startCamera() {

    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // };

    // this.camera.getPicture(options).then((imageData) => {
    //  // imageData is either a base64 encoded string or a file URI
    //  // If it's base64 (DATA_URL):
    //  const base64Image = 'data:image/jpeg;base64,' + imageData;
    // }, (err) => {
    //  // Handle error
    // });
  }


  onSelectFile(event) {

    this.fileToUpload = event.target.files.item(0);

    const freader = new FileReader();

    freader.onload = (ev: any) => {

      this.fileUrl = ev.target.result;

      this.dismiss();
    };

    freader.readAsDataURL(this.fileToUpload);

  }


  async dismiss() {
    await this.modalController.dismiss(
       {
          imageBase64: this.fileUrl.substring(this.fileUrl.indexOf(',') + 1),
          imageType: this.fileToUpload.type
        }
    );
  }

}
