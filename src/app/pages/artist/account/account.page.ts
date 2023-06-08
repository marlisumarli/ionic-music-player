import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, ModalController} from "@ionic/angular";
import {ChangePictureComponent} from "../change-picture/change-picture.component";
import {ApiArtistService} from "../../../services/api-artist.service";
import {ArtistModel} from "../../../model/artist.model";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  account: ArtistModel;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private apiArtist: ApiArtistService
  ) {
  }

  ngOnInit() {
    this.apiArtist.fetchAccount();
    this.apiArtist.account.subscribe(account => this.account = account);
  }

  onButtonChange() {
    this.actionSheetCtrl.create({
      header: 'What You would change?',
      mode: 'ios',
      buttons: [
        {
          text: 'Change Picture',
          handler: () => this.onChangePicture()
        },
        {
          text: 'Change Name',
          handler: () => this.onChangeName()
        }, {
          text: 'Change Bio',
          handler: () => this.onChangeBio()
        },
        {
          text: 'Cancel',
          role: 'destructive'
        }
      ]
    }).then(r => {
      r.present();
    });
  }

  onChangePicture() {
    this.modalCtrl.create({
      component: ChangePictureComponent
    }).then(r => {
      r.present();
    });
  }

  onChangeName() {
    this.alertCtrl.create({
      header: 'Change Name',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'New Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'destructive'
        },
        {
          text: 'Change',
          handler: () => {
            console.log('Change Name')
          }
        }
      ]
    }).then(r => {
      r.present();
    });
  }

  onChangeBio() {
    this.alertCtrl.create({
      header: 'Change Bio',
      inputs: [
        {
          name: 'bio',
          type: 'textarea',
          placeholder: 'New Bio'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'destructive'
        },
        {
          text: 'Change',
          handler: () => {
            console.log('Change Bio')
          }
        }
      ]
    }).then(r => {
      r.present();
    });
  }
}
