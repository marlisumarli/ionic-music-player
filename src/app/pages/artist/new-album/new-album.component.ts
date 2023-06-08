import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController} from "@ionic/angular";
import {ApiArtistService} from "../../../services/api-artist.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AlbumModel} from "../../../model/album.model";

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.scss'],
})
export class NewAlbumComponent implements OnInit {
  url: any;
  form: FormGroup;
  file: any;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private apiArtist: ApiArtistService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup<any>({
      title: new FormControl(null, {
        updateOn: 'blur'
      }),
      image: new FormControl(null, {
        updateOn: 'blur'
      })
    });
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
      this.file = event.target.files[0];
    }
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onCreateAlbum() {
    this.loadingCtrl.create({
      message: 'Creating album'
    }).then(loadingEl => {
      loadingEl.present();

      setTimeout(() => {
        loadingEl.dismiss();

        this.modalCtrl.dismiss({
          message: 'Album created successfully'
        }, 'confirm').then(() => {
          let albumModel = new AlbumModel();
          albumModel.title = this.form.value.title;
          this.apiArtist.createAlbum(albumModel, this.file).subscribe();
        });
      }, 1500);
    });
  }
}
