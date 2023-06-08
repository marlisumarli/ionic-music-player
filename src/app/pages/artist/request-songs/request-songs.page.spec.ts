import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RequestSongsPage} from './request-songs.page';

describe('RequestSongsPage', () => {
  let component: RequestSongsPage;
  let fixture: ComponentFixture<RequestSongsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RequestSongsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
