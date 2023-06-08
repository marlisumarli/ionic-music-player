import {Component, OnInit} from '@angular/core';
import {ApiAdminService} from "../../../services/api-admin.service";
import {UserModel} from "../../../model/user.model";
import {ActivatedRoute} from "@angular/router";
import {AlertController, LoadingController, NavController} from "@ionic/angular";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {
  userId: any;
  form: FormGroup;
  user: UserModel;
  interval: any;

  constructor(
    private apiAdmin: ApiAdminService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {

      if (!paramMap.has('userId')) {
        this.navCtrl.navigateBack('/admin/tabs/users');
        return;
      }

      this.userId = paramMap.get('userId');
    });

    this.form = new FormGroup({
      email: new FormControl(null, {
        updateOn: "blur"
      }),
      password: new FormControl(null, {
        updateOn: "blur"
      })
    });

    this.apiAdmin.fetchUserById(this.userId);
    this.apiAdmin.user.subscribe(user => this.user = user);
  }

  onUpdateEmail() {
    this.alertCtrl.create({
      header: 'Update email',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'New email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: (alertData) => {
            this.loadingCtrl.create({
              message: 'Updating email'
            }).then(loadingEl => {
              loadingEl.present();

              setTimeout(() => {
                loadingEl.dismiss();

                let userModel = new UserModel();
                userModel.email = alertData.email;
                userModel.id = this.userId;

                this.apiAdmin.updateUser(userModel).subscribe();
              }, 1500);
            });

          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  onUpdatePassword() {
    this.alertCtrl.create({
      header: 'Update password',
      inputs: [
        {
          name: 'password',
          type: 'text',
          placeholder: 'New password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: (alertData) => {
            this.loadingCtrl.create({
              message: 'Updating password'
            }).then(loadingEl => {
              loadingEl.present();

              setTimeout(() => {
                loadingEl.dismiss();

                let userModel = new UserModel();
                userModel.password = alertData.password;
                userModel.id = this.userId;

                this.apiAdmin.updateUser(userModel).subscribe();
              }, 1500);
            });

          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  onDelete() {
    this.loadingCtrl.create({
      message: 'Deleting user'
    }).then(loadingEl => {
      loadingEl.present();

      setTimeout(() => {
        loadingEl.dismiss();

        this.apiAdmin.deleteUser(this.userId).subscribe();

        this.navCtrl.navigateBack('/admin/tabs/users');
      }, 1500);
    });
  }

}
