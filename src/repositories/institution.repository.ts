import { Injectable } from '@nestjs/common';
import { Institution, InstitutionId } from 'src/types/Institution';
import { WorkerId } from 'src/types/worker';
import { Institutions, InstitutionsHasAdmin, InstitutionsHasWorker } from 'src/__mocks__/institutions';

@Injectable()
export class InstitutionRepository {
    private institutions = Institutions;
    private institutionsHasWorker = InstitutionsHasWorker;
    private institutionsHasAdmin = InstitutionsHasAdmin;

    getInstitution(id: InstitutionId): Institution | undefined {
        return this.institutions[id];
    }

    getInstitutionsByWorker(workerId: WorkerId): Institution[] {
        return this.institutionsHasWorker
            .filter(([_, id]) => id === workerId)
            .map(([id]) => this.institutions[id]);
    }
}
