export interface IUser {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}

class User implements IUser {
  id: string;
  username: string;
  email: string;
  createdAt: Date;

  constructor(id: string, username: string, email: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.createdAt = new Date();
  }

  getInfo(): string {
    return `User ${this.username} (${this.email})`;
  }
}

export default User;
