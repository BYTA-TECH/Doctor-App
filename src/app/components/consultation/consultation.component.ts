import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Util } from 'src/app/services/util';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
})
export class ConsultationComponent implements OnInit {
  status = null;
  token;

  taskId;

  processInstanceId;

  appointment;
  constructor(private modalController: ModalController,
              private commandResourceService: CommandResourceService,
              private queryResourceService: QueryResourceService,
              private util: Util,
              private alertController: AlertController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  startConsultation() {
    this.util.createLoader().then(loader => {
      loader.present();
      this.startConsultations(
        () => {
          loader.dismiss();
          this.status = 'waiting';
          this.showAlert();
        },
        () => {
          loader.dismiss();
          alert('Some Error Occured');
        }
      );
    });
  }

  startConsultations(success, error) {
    // console.log('Getting ProcessInstanceId with token');
    this.commandResourceService
      .initiateConsultationUsingPOST()
      .subscribe(data => {
        this.processInstanceId = data;
        console.log('Got ProcessInstanceId with token' + ' ', this.processInstanceId);
        success();
      }, error);
  }


  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Collect Paramedical Information',
      message: 'Would You Like to Collect Paramedical Information',
      buttons: [
        {
          text: 'Skip',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // this.collectParamedicalInfo(false, () => {
            //   this.showAddMedicalSummary();
            // });
          }
        },
        {
          text: 'Yes',
          handler: () => {
            // this.collectParamedicalInfo(true, () => {
            //   this.showAddParamedical();
            // });
          }
        }
      ]
    });
    await alert.present();
    return alert;
  }

  // collectParamedicalInfo(value, success) {
  //   let status = { paramedRequired: 'no' };
  //   if (value === true) {
  //     status.paramedRequired = 'yes';
  //   }
  //   return this.commandResourceService.collectInformationsUsingPOST({
  //     taskId: this.taskId.toString(),
  //     defaultInfoRequest: status
  //   }).subscribe((data) => {
  //     console.log('Collect Informations Using ' + this.taskId, ' ', data);
  //     success();
  //   }, err => {

  //   });
  // }

  // async showAddParamedical() {
  //   const modal = await this.modalController.create({
  //     component: AddParamedicalComponent
  //   });

  //   modal.onDidDismiss().then(data => {
  //     if (data.data !== undefined) {
  //       console.log('Saving Paramedical Info', data.data);
  //       this.saveParamedicalInfo(data.data, () => {
  //         this.showAddMedicalSummary();
  //       });
  //     } else {
  //       this.status = 'canceled';
  //     }
  //   });
  //   modal.present();
  // }

  // saveParamedicalInfo(paramedicalInfo: ParamedicalExaminationRequest, success) {
  //   console.log('Getting New TaskId , Current ' + this.taskId);
  //   this.queryResourceService.getTasksUsingGET({
  //     processInstanceId: this.processInstanceId
  //   })
  //     .subscribe((data) => {
  //       this.taskId = data.data[0].id;
  //       console.log('Got TaskId with processInstanceId', this.processInstanceId + ' ', this.taskId);
  //       this.commandResourceService
  //         .collectParamedicalExaminationInformationsUsingPOST({
  //           taskId: this.taskId.toString(),
  //           paramedicalExaminationRequest: paramedicalInfo,
  //         })
  //         .subscribe(value => {
  //           success();
  //         },
  //           err => {

  //           });
  //     });
  // }

  // async showAddMedicalSummary() {
  //   const modal = await this.modalController.create({
  //     component: AddMedicalSummaryComponent
  //   });

  //   modal.onDidDismiss().then(data => {
  //     if (data.data !== undefined) {
  //       console.log('Saving Medical Summary', data.data);
  //       this.saveMedicalSummary(data.data, () => {
  //         this.showPrescription();
  //       });
  //     } else {
  //       this.status = 'canceled';
  //     }
  //   });
  //   modal.present();
  // }

  // saveMedicalSummary(consultationInfo: ConsultationRequest, success) {
  //   this.queryResourceService.getTasksUsingGET({
  //     processInstanceId: this.processInstanceId
  //   })
  //     .subscribe((data) => {
  //       this.taskId = data.data[0].id;
  //       this.commandResourceService.collectConsultationInformationsUsingPOST(
  //         {
  //           taskId: this.taskId.toString(),
  //           consultationRequest: consultationInfo
  //         }
  //       )
  //         .subscribe(data => {
  //           success();
  //         });
  //     });
  // }

  // async showPrescription() {
  //   const modal = await this.modalController.create({
  //     component: PrescriptionListComponent
  //   });

  //   modal.onDidDismiss().then(data => {
  //     if (data.data !== undefined) {
  //       console.log('Saving Prescription', data.data);
  //       this.savePrescription(data.data, () => {
  //         this.status = 'completed';
  //       });
  //     } else {
  //       this.status = 'canceled';
  //     }
  //   });
  //   modal.present();
  // }

  // savePrescription(prescription: Array<PrescriptionRequest>, success) {
  //   this.queryResourceService.getTasksUsingGET({ processInstanceId: this.processInstanceId })
  //     .subscribe(data => {
  //       this.taskId = data.data[0].id;
  //       this.commandResourceService.collectPrescriptionInformationsUsingPOST(
  //         {
  //           taskId: this.taskId,
  //           prescriptionRequest: prescription
  //         })
  //         .subscribe((data) => {
  //           success();
  //           console.log('Completed', data);
  //         });

  //     });
  // }

  // completedConsultation() {
  //   this.modalController.dismiss(this.appointment);
  // }

  // downloadPrescription() {

  //   this.util.createLoader()
  //   .then(loader => {
  //     loader.present();
  //     let fileName =  this.appointment.name + this.appointment.token;
  //     this.downloadPrescriptions(fileName , () => {
  //       loader.dismiss();
  //       this.completedConsultation();
  //     }, () => {
  //       loader.dismiss();
  //       this.completedConsultation();
  //       alert('Unable tp Download PDF');
  //     });
  //   });
  // }

  // downloadPrescriptions(fileName , success , error) {

  //   this.queryResourceService.exportPrescriptionAsPdfUsingGET()
  //     .subscribe((pdf: PdfDTO ) => {


  //       const byteCharacters = atob(pdf.pdf);
  //       const byteNumbers = new Array(byteCharacters.length);
  //       for (let i = 0; i < byteCharacters.length; i++) {
  //           byteNumbers[i] = byteCharacters.charCodeAt(i);
  //       }
  //       const byteArray = new Uint8Array(byteNumbers);
  //       const blob = new Blob([byteArray], {type: pdf.contentType});

  //       console.log('Blob**' + blob);
  //       this.file.createFile(this.file.externalCacheDirectory, fileName, true).then(() => {
  //         console.log('file created' + blob);
  //         this.file.writeFile(this.file.externalCacheDirectory, fileName, blob, { replace: true })
  //         .then((value) => {
  //             console.log('file writed' + value);
  //             this.documentViewer.viewDocument(this.file.externalCacheDirectory + fileName, 'application/pdf', {});
  //             success();
  //           })
  //           .catch(error);
  //       })
  //       .catch(error);

  //     },
  //     err => {
  //       error();
  //     });
  // }
}
