import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../../model/user.model";
import {ApiAdminService} from "../../../services/api-admin.service";

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.page.html',
  styleUrls: ['./admin-list.page.scss'],
})
export class AdminListPage implements OnInit {
  users: UserModel[];

  constructor(
    private apiAdmin: ApiAdminService
  ) {
  }

  ngOnInit() {
    this.apiAdmin.fetchAllAdmin();
    this.apiAdmin.users.subscribe(users => this.users = users);
  }

}
