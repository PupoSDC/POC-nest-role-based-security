import { SetMetadata } from '@nestjs/common';
import { Role } from 'nest-access-control';

export interface RoleWithTarget extends Role {
    target: string,
};

/**
 * Define an access information required for this route.
 * Notice that all Roles must be satisfied/passed
 */
export const AccessControl = (role: RoleWithTarget) => SetMetadata('access-control', role);