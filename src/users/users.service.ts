/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  
  constructor() {
    this.users = [
      { userId: '1', username: 'john', password: 'changeme' },
      { userId: '2', username: 'maria', password: 'guess' },
    ];
  }


  async create(username: string, password: string): Promise<User> {
    const user = { userId: Date.now().toString(), username, password };
    this.users.push(user);
    return user;
  }
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}
