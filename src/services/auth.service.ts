import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WorkerService } from 'src/services/worker.service';
import { User, UserId } from 'src/types/user';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    validateUser(userId: UserId): User | null {
        return this.userService.getUser(userId) ?? null;
    }

    login(userId: UserId) {
        const payload = { userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}