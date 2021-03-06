import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionsGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routePermissions = this.reflector.get<string[]>('permissions', context.getHandler());
    const userPermissions = context.getArgs()[0].user.permissions;

    if(!routePermissions) {
      return true;
    }

    const hasPermissions = () => routePermissions.every(routePermissions => userPermissions.includes(routePermissions))
    return hasPermissions();
  }
}
