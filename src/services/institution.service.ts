import { Injectable, UseGuards } from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';
import { Institution, InstitutionId } from 'src/types/Institution';
import { UserId } from 'src/types/user';
import { Institutions, InstitutionsHasWorker } from 'src/__mocks__/institutions';

@Injectable()
export class InstitutionService {
    private institutions = Institutions;
    private institutionsHasWorker = InstitutionsHasWorker;

    getInstitution(id: InstitutionId): Institution | undefined {
        return this.institutions[id];
    }

    getInstitutionsByWorker(workerId: UserId): Institution[] {
        return this.institutionsHasWorker
            .filter(([_, id]) => id === workerId)
            .map(([id]) => this.institutions[id]);
    }
}
