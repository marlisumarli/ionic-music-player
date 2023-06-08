import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LoadingController, ModalController} from "@ionic/angular";
import {ApiAdminService} from "../../../services/api-admin.service";
import {ArtistModel} from "../../../model/artist.model";

@Component({
  selector: 'app-new-artist',
  templateUrl: './new-artist.component.html',
  styleUrls: ['./new-artist.component.scss'],
})
export class NewArtistComponent implements OnInit {
  form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private apiAdmin: ApiAdminService
  ) {

  }

  ngOnInit() {
    this.form = new FormGroup<any>({
      email: new FormControl(null, {
        updateOn: "blur"
      }),
      password: new FormControl(null, {
        updateOn: "blur"
      }),
      fullName: new FormControl(null, {
        updateOn: "blur"
      })
    })
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onCreateArtist() {
    this.loadingCtrl.create({
      message: 'Creating artist'
    }).then(loadingEl => {
      loadingEl.present();

      setTimeout(() => {
        loadingEl.dismiss();

        let artistModel = new ArtistModel();
        artistModel.email = this.form.value.email;
        artistModel.password = this.form.value.password;
        artistModel.fullName = this.form.value.fullName;
        artistModel.registeredAt = "20-20-2021";
        artistModel.id = Math.random().toString();
        this.apiAdmin.createArtist(artistModel).subscribe();

        this.modalCtrl.dismiss({
          message: 'Artist created successfully'
        }, 'confirm').then(() => {
          this.form.reset();
        });
      }, 1000);
    });
  }
}
