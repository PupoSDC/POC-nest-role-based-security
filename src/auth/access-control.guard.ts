import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRolesBuilder, Role, RolesBuilder } from "nest-access-control";
import { AppRole } from "src/app.roles";
import { User } from "src/types/user";
import { InstitutionsHasAdmin, InstitutionsHasWorker } from "src/__mocks__/institutions";
import { RoleWithTarget } from "./access-control.decorator";

type targetId = string;
type UserRoleWithTarget = [AppRole, targetId];

@Injectable()
export class AccessControlGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRolesBuilder() private readonly roleBuilder: RolesBuilder,
  ) { }

  protected async getUser(context: ExecutionContext): Promise<User | undefined> {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }

  protected async getUserRoles(context: ExecutionContext): Promise<UserRoleWithTarget[]> {
    const user = await this.getUser(context);
    if (!user) throw new UnauthorizedException();
    let roles: UserRoleWithTarget[] = [];
    InstitutionsHasAdmin
      .filter(([_, id]) => id === user.id)
      .forEach(([institutionId]) => roles.push([AppRole.INSTITUTION_ADMIN, institutionId]));
    InstitutionsHasWorker
      .filter(([_, id]) => id === user.id)
      .forEach(([institutionId]) => roles.push([AppRole.INSTITUTION_WORKER, institutionId]));

    return roles;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<RoleWithTarget>('access-control', context.getHandler());
    const params = context.switchToHttp().getRequest()?.params ?? {};
    const userRoles = await this.getUserRoles(context);
    const target = params[role.target];
    const resourceRoles = userRoles
      .filter(([_, ruleTarget]) => ruleTarget === target)
      .map(([role]) => role);

    if (!role) {
      return true;
    }

    if (!resourceRoles.length) {
      return false;
    }

    console.log({
      role, params, userRoles, resourceRoles,
    });

    const permission = this.roleBuilder.permission({
      action: role.action,
      resource: role.resource,
      possession: role.possession,
      role: resourceRoles,
    });

    return permission.granted;
  }
}