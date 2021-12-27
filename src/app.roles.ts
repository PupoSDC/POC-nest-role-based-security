import { RolesBuilder } from "nest-access-control";

export enum AppRole {
    INSTITUTION_ADMIN = 'INSTITUTION_ADMIN',
    INSTITUTION_WORKER = 'INSTITUTION_WORKER',
}

export enum AppResource {
    INSTITUTION = "institution",
    INSTITUTION_WORKERS = "institutionWorkers",
    WORKER_PROFILE = "WorkerProfile",
}

export const roles: RolesBuilder = new RolesBuilder();

// prettier-ignore
roles
    .grant(AppRole.INSTITUTION_ADMIN)
        .readOwn(AppResource.INSTITUTION)
        .readOwn(AppResource.INSTITUTION_WORKERS)
    .grant(AppRole.INSTITUTION_WORKER)
        .readOwn(AppResource.INSTITUTION)
        .readOwn(AppResource.WORKER_PROFILE);
