import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController} from "@ionic/angular";
import {FormControl, FormGroup} from "@angular/forms";
import {UserModel} from "../../../model/user.model";
import {ApiAdminService} from "../../../services/api-admin.service";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
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

  onCreateUser() {
    let userModel = new UserModel();
    userModel.email = this.form.value.email;
    userModel.password = this.form.value.password;
    userModel.fullName = this.form.value.fullName;
    this.apiAdmin.createUser(userModel).subscribe();

    this.loadingCtrl.create({
      message: 'Creating user'
    }).then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        loadingEl.dismiss();
        this.modalCtrl.dismiss({
          message: 'User created successfully'
        }, 'confirm').then(() => {
          this.form.reset();
        });
      }, 1000)
    });
  }
}
