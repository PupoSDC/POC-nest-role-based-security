import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { InstitutionRepository } from 'src/repositories/institution.repository';
import { WorkerRepository } from 'src/repositories/worker.repository';
import { Institution } from 'src/types/Institution';
import { Worker, WorkerId } from 'src/types/worker';

@Controller("institution")
export class InstitutionController {
    constructor(
        private readonly institutionRepository: InstitutionRepository,
        private readonly workerRepository: WorkerRepository
    ) { }

    @Get(":id")
    getInstitution(
        @Param('id') id: WorkerId,
    ): Institution {
        const institution = this.institutionRepository.getInstitution(id);
        if (!institution) {
            throw new NotFoundException();
        }
        return institution;
    }

    @Get(":id/workers")
    getInstitutionWorkers(
        @Param('id') id: WorkerId,
    ): Worker[] {
        return this.workerRepository.getWorkersByInstitution(id);
    }
}
