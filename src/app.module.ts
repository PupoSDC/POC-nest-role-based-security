import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { InstitutionController } from './controllers/institution.controller';
import { InstitutionRepository } from './repositories/institution.repository';
import { WorkerRepository } from './repositories/worker.repository';

@Module({
  imports: [],
  controllers: [
    AppController, 
    InstitutionController
  ],
  providers: [
    InstitutionRepository,
    WorkerRepository
  ],
})
export class AppModule {}
