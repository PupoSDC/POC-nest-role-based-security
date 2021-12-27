import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InstitutionService } from 'src/services/institution.service';
import { WorkerService } from 'src/services/worker.service';
import { Institution } from 'src/types/Institution';
import { User, UserId } from 'src/types/user';

@UseGuards(JwtAuthGuard)
@Controller("institution")
export class InstitutionController {
    constructor(
        private readonly institutionService: InstitutionService,
        private readonly workerRepository: WorkerService
    ) { }

    @Get(":id")
    getInstitution(
        @Param('id') id: UserId,
    ): Institution {
        const institution = this.institutionService.getInstitution(id);
        if (!institution) {
            throw new NotFoundException();
        }
        return institution;
    }

    @Get(":id/workers")
    getInstitutionWorkers(
        @Param('id') id: UserId,
    ): User[] {
        return this.workerRepository.getWorkersByInstitution(id);
    }
}
