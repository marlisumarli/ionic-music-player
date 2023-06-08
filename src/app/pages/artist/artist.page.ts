import {Component, ViewChild} from '@angular/core';
import {IonTabs} from "@ionic/angular";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.page.html',
  styleUrls: ['./artist.page.scss'],
})
export class ArtistPage {
  @ViewChild(IonTabs) tabs: IonTabs;

  selectedTab: any;

  setSelectedTab() {
    this.selectedTab = this.tabs.getSelected();
  }
}
