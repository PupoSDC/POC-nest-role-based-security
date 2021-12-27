import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';
import { AppController } from './controllers/app.controller';
import { InstitutionController } from './controllers/institution.controller';
import { UserService } from "./services/user.service";
import { InstitutionService } from './services/institution.service';
import { WorkerService } from './services/worker.service';
import { LocalStrategy } from './auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy, JWT_SECRET } from './auth/jwt.strategy';
import { WorkerController } from './controllers/worker.controller';

@Module({
  imports: [
    PassportModule,
    AccessControlModule.forRoles(roles),
    JwtModule.register({ secret: JWT_SECRET }),
  ],
  controllers: [
    AppController,
    AuthController,
    WorkerController,
    InstitutionController
  ],
  providers: [
    JwtStrategy,
    LocalStrategy,
    AuthService,
    UserService,
    InstitutionService,
    WorkerService
  ],
})
export class AppModule { }
