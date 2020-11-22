export default class User {
  constructor(firstName, lastName, avatar) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatar = avatar;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}