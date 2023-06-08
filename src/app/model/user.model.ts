export class UserModel {
  private _id: any;
  private _email: string;
  private _password: string;
  private _fullName: string;
  private _registeredAt: string;

  get id(): any {
    return this._id;
  }

  set id(value: any) {
    this._id = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get fullName(): string {
    return this._fullName;
  }

  set fullName(value: string) {
    this._fullName = value;
  }

  get registeredAt(): string {
    return this._registeredAt;
  }

  set registeredAt(value: string) {
    this._registeredAt = value;
  }
}
