import { Injectable } from '@nestjs/common';
import { InstitutionId } from 'src/types/Institution';
import { Worker, WorkerId } from 'src/types/worker';
import { InstitutionsHasWorker } from 'src/__mocks__/institutions';
import { Workers } from 'src/__mocks__/workers';

@Injectable()
export class WorkerRepository {
    private readonly workersDb = Workers;
    private readonly institutionHasWorkerDb = InstitutionsHasWorker;

    getWorker(id: WorkerId): Worker | undefined {
        return this.workersDb[id];
    }

    getWorkersByInstitution(institutionId: InstitutionId): Worker[] {
        return this.institutionHasWorkerDb
        .filter(([id, _]) => id === institutionId)
            .map(([_, id]) => this.workersDb[id]);
    }
}
