import { Controller, Param, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { AuthService } from "src/services/auth.service";
import { UserId } from "src/types/user";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('login/:id')
    async login(@Param("id") userId: UserId) {
      return this.authService.login(userId);
    }
}
