import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController} from "@ionic/angular";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-change-picture',
  templateUrl: './change-picture.component.html',
  styleUrls: ['./change-picture.component.scss'],
})
export class ChangePictureComponent implements OnInit {
  url: any;
  form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup<any>({
      image: new FormControl(null, {
        updateOn: 'blur'
      })
    })
  }


  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onChangePicture() {

  }
}
