export class SongModel {
  private _id: any;
  private _title: string;
  private _url: any;
  private _likeCount: number;
  private _releaseDate: string;
  private _duration: number;
  private _userId: any;
  private _albumId: any;
  private _artistId: any;
  private _status: string;
  private _albumImage: string;
  private _albumTitle: string;
  private _artistName: string;
  private _isLike: boolean;

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

  get url(): any {
    return this._url;
  }

  set url(value: any) {
    this._url = value;
  }

  get likeCount(): number {
    return this._likeCount;
  }

  set likeCount(value: number) {
    this._likeCount = value;
  }


  get albumImage(): string {
    return this._albumImage;
  }

  set albumImage(value: string) {
    this._albumImage = value;
  }


  get artistName(): string {
    return this._artistName;
  }

  set artistName(value: string) {
    this._artistName = value;
  }


  get albumId(): any {
    return this._albumId;
  }

  set albumId(value: any) {
    this._albumId = value;
  }


  get artistId(): any {
    return this._artistId;
  }

  set artistId(value: any) {
    this._artistId = value;
  }

  get userId(): any {
    return this._userId;
  }

  set userId(value: any) {
    this._userId = value;
  }


  get releaseDate(): string {
    return this._releaseDate;
  }

  set releaseDate(value: string) {
    this._releaseDate = value;
  }


  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }


  get albumTitle(): string {
    return this._albumTitle;
  }

  set albumTitle(value: string) {
    this._albumTitle = value;
  }


  get duration(): number {
    return this._duration;
  }

  set duration(value: number) {
    this._duration = value;
  }


  get isLike(): boolean {
    return this._isLike;
  }

  set isLike(value: boolean) {
    this._isLike = value;
  }
}
