import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
    INSTITUTION_ADMIN = 'INSTITUTION_ADMIN',
}

export const roles: RolesBuilder = new RolesBuilder();


// prettier-ignore
roles
    .grant(AppRoles.INSTITUTION_ADMIN)
        .readOwn('institution', ['worker']);
