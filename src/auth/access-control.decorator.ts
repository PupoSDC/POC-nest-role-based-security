import { SetMetadata } from '@nestjs/common';
import { Role } from 'nest-access-control';

export interface RoleWithTarget extends Role {
    paramTarget?: string,
};

/**
 * Define an access information required for this route.
 * Notice that all Roles must be satisfied/passed
 */
export const AccessControl = (role?: RoleWithTarget | undefined) => SetMetadata('access-control', role);