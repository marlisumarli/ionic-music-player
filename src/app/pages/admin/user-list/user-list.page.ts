import {Component, OnInit} from '@angular/core';
import {ApiAdminService} from "../../../services/api-admin.service";
import {UserModel} from "../../../model/user.model";
import {ModalController} from "@ionic/angular";
import {NewUserComponent} from "../new-user/new-user.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {
  users: UserModel[];

  constructor(
    private apiAdmin: ApiAdminService,
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {
    this.apiAdmin.fetchAllUsers();
    this.apiAdmin.users.subscribe(users => this.users = users);

  }

  onAddButton() {
    this.modalCtrl
      .create({
        component: NewUserComponent
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resData => {
        if (resData.role === 'confirm') {

        }
      })
  }

}
