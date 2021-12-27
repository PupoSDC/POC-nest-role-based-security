import { Injectable } from '@nestjs/common';
import { InstitutionId } from 'src/types/Institution';
import { User, UserId } from 'src/types/user';
import { InstitutionsHasWorker } from 'src/__mocks__/institutions';
import { Users } from 'src/__mocks__/users';

@Injectable()
export class WorkerService {
    private readonly usesrsDb = Users;
    private readonly institutionHasWorkerDb = InstitutionsHasWorker;

    getWorkerById(workerId: UserId): User | undefined {
        return this.usesrsDb[workerId];
    }

    getWorkersByInstitution(institutionId: InstitutionId): User[] {
        return this.institutionHasWorkerDb
        .filter(([id, _]) => id === institutionId)
            .map(([_, id]) => this.usesrsDb[id]);
    }

    getWorkerFromInstitution(institutionId: InstitutionId, workerId: UserId): User | undefined {
        return this
            .getWorkersByInstitution(institutionId)
            .find((worker) => worker.id === workerId);
    }
}
