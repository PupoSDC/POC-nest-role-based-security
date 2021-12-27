import { Controller, Response,  Get, NotFoundException, Param, Query, Res, UseGuards } from '@nestjs/common';
import { AppResource } from 'src/app.roles';
import { AccessControl } from 'src/auth/access-control.decorator';
import { AccessControlGuard } from 'src/auth/access-control.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { WorkerService } from 'src/services/worker.service';
import { User, UserId } from 'src/types/user';

@UseGuards(JwtAuthGuard, AccessControlGuard)
@Controller("worker")
export class WorkerController {
    constructor(
        private readonly workerService: WorkerService
    ) { }

    /** @deprecated  */
    @Get("/by-institution-id-and-worker")
    getWorkerByInstitutionIdAndWorker(
        @Query() params: {
            workerId: string,
            institutionId: string,
        },
        @Res() response: Response,
    ): string {
        const { workerId, institutionId} = params;
        response.redirected
        return "";
    }


    @AccessControl({
        resource: AppResource.WORKER_PROFILE,
        action: 'read',
        possession: 'own',
        paramTarget: "workerId",
    })
    @Get(":workerId")
    getInstitutionWorkers(
        @Param('workerId') id: UserId,
    ): User {
        const worker = this.workerService.getWorkerById(id);
        if (!worker) {
            throw new NotFoundException();
        }
        return worker;
    }
}
