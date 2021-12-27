import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AppResource } from 'src/app.roles';
import { AccessControl } from 'src/auth/access-control.decorator';
import { AccessControlGuard } from 'src/auth/access-control.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InstitutionService } from 'src/services/institution.service';
import { WorkerService } from 'src/services/worker.service';
import { Institution } from 'src/types/Institution';
import { User, UserId } from 'src/types/user';

@UseGuards(JwtAuthGuard, AccessControlGuard)
@Controller("institution")
export class InstitutionController {
    constructor(
        private readonly institutionService: InstitutionService,
        private readonly workerRepository: WorkerService
    ) { }

    @AccessControl({
        resource: AppResource.INSTITUTION,
        action: 'read',
        possession: 'own',
        target: "institutionId",
    })
    @Get(":institutionId")
    getInstitution(
        @Param('institutionId') id: UserId,
    ): Institution {
        const institution = this.institutionService.getInstitution(id);
        if (!institution) {
            throw new NotFoundException();
        }
        return institution;
    }

    @AccessControl({
        resource: AppResource.INSTITUTION_WORKERS,
        action: 'read',
        possession: 'own',
        target: "institutionId",
    })
    @Get(":institutionId/workers")
    getInstitutionWorkers(
        @Param('institutionId') id: UserId,
    ): User[] {
        return this.workerRepository.getWorkersByInstitution(id);
    }
}
