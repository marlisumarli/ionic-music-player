import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {LoadingController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-artist-register',
  templateUrl: './artist-register.page.html',
  styleUrls: ['./artist-register.page.scss'],
})
export class ArtistRegisterPage implements OnInit {
  formGroup: FormGroup;
  isLoading = false;
  fileUrl: any;
  file: File;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup<any>({
      fullName: new FormControl(null, {
        updateOn: 'blur'
      }),
      email: new FormControl(null, {
        updateOn: 'blur'
      }),
      password: new FormControl(null, {
        updateOn: 'blur'
      })
    });
  }

  fileReader(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.fileUrl = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
      this.file = event.target.files[0];
    }
  }

  onRegister() {
    const formData = new FormData();
    formData.append('fullName', this.formGroup.value.fullName);
    formData.append('image', this.file, this.file.name);
    formData.append('email', this.formGroup.value.email);
    formData.append('password', this.formGroup.value.password);
    formData.append('role', 'artist');
    this.isLoading = true;
    this.authService.registerArtist(formData);
    this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Registering...'
    }).then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        this.isLoading = false;
        loadingEl.dismiss();
        this.router.navigateByUrl("/login");
      }, 1000)
    });
    this.formGroup.reset();
  }
}
