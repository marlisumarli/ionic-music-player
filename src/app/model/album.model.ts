export class AlbumModel {
  private _id: any;
  private _title: string;
  private _image: string;
  private _publishDate: string;

  get id(): any {
    return this._id;
  }

  set id(value: any) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get publishDate(): string {
    return this._publishDate;
  }

  set publishDate(value: string) {
    this._publishDate = value;
  }
}
