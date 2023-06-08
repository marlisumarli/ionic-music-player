import {Component, OnInit, ViewChild} from '@angular/core';
import {IonTabs} from "@ionic/angular";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {
  @ViewChild(IonTabs) tabs: IonTabs;

  selectedTab: any;

  constructor() {
  }

  setSelectedTab() {
    this.selectedTab = this.tabs.getSelected();
  }

}
