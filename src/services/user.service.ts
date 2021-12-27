import { Injectable } from '@nestjs/common';
import { User, UserId } from 'src/types/user';
import { Users } from 'src/__mocks__/users';

@Injectable()
export class UserService {
    private readonly usersDb = Users;

    getUser(userId: UserId): User | undefined {
        return this.usersDb[userId];
    }
}
