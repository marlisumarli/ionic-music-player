import {Component, Input, OnInit} from '@angular/core';
import {LoadingController, ModalController} from "@ionic/angular";
import {AlbumModel} from "../../../model/album.model";
import {ApiArtistService} from "../../../services/api-artist.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Howl} from "howler";
import {SongModel} from "../../../model/song.model";

@Component({
  selector: 'app-request-song',
  templateUrl: './request-song.component.html',
  styleUrls: ['./request-song.component.scss'],
})
export class RequestSongComponent implements OnInit {
  @Input() album: AlbumModel;

  form: FormGroup;
  howl: Howl;
  file: any;
  duration: any;
  formData: FormData = new FormData();

  constructor(
    private modalCtrl: ModalController,
    private apiArtist: ApiArtistService,
    private loadingCtrl: LoadingController,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur'
      }),
      audio: new FormControl(null, {
        updateOn: 'blur'
      })
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.file = event.target.result;

        const sound = new Howl({
          src: [this.file],
          onload: () => {
            this.duration = Math.ceil(sound.duration());
            this.formData.append('duration', this.duration);
          }
        });
      };
      reader.readAsDataURL(event.target.files[0]);
      this.file = event.target.files[0];
      this.formData.append('audio', this.file, this.file.name);
    }
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onRequestSong() {
    this.formData.append('title', this.form.value.title);
    this.loadingCtrl.create({
      message: 'Requesting song'
    }).then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        const song = new SongModel();
        song.title = this.form.value.title;
        song.duration = this.duration;
        this.apiArtist.createSong(this.album.id, song, this.formData);
        loadingEl.dismiss();
        this.modalCtrl.dismiss({
          message: 'Song requested successfully'
        }, 'confirm');
        this.form.reset();
      }, 1500);
    });
  }
}
